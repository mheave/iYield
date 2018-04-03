//https://github.com/ConsenSys/eth-signer
//https://web3js.readthedocs.io/en/1.0/web3-eth-abi.html#encodefunctioncall
//https://github.com/ethjs/ethjs-abi/blob/e63f92966179d9017b57c9eadef78384a6899a51/src/index.js#L113
//var userModel = require('../models/userModel');
//const config = require('../config')
const Eth = require('ethjs');
const ethAbi = require('ethjs-abi');
const _ = require('lodash')
const sign = require('ethjs-signer').sign
const BN = require('bignumber.js')

// does it violate principles of class style JS to pull in config object in to a class from outside of a class?
//const config = require('../config')
// Need to unlock main account on node for this to work
//web3.personal.unlockAccount("0x1313734d2D6625173278978DDaa7B63400462745", '', 9999999);

class RegistryService{
    constructor(abi, contractAddress){  
        // set default in function or var or file... 
        this.abi = abi || [{"constant":false,"inputs":[{"name":"_originator","type":"address"},{"name":"_beneficiary","type":"address"}],"name":"updateParticpant","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAllBeneficiaries","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_account","type":"address"}],"name":"getBeneficiary","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_originator","type":"address"}],"name":"removeParticipant","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_originator","type":"address"}],"name":"isValidParticipant","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_originator","type":"address"},{"name":"_beneficiary","type":"address"}],"name":"addParticipant","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Register","outputs":[{"name":"beneficiary","type":"address"},{"name":"index","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"originator","type":"address"},{"indexed":true,"name":"beneficiary","type":"address"}],"name":"ParticipantAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"originator","type":"address"},{"indexed":true,"name":"beneficiary","type":"address"}],"name":"ParticipantUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"originator","type":"address"}],"name":"ParticipantRemoved","type":"event"}];
        this.contractAddress = contractAddress || '0x4cca94d9e3be68f8329b6af1363b8ea2b10e4273';
     //    this.eth = new Eth(new Eth.HttpProvider('http://127.0.0.1:8545'));
        this.eth = new Eth(new Eth.HttpProvider('https://rinkeby.infura.io'));
    

    
        this.contract = new this.eth.contract(this.abi).at(this.contractAddress);
        this.ownerAddress = '0x1313734d2D6625173278978DDaa7B63400462745';
        this.pvtKey = '0x673a54beee87f667d9204d314433b04e49011d1a4caa74bf166830d6d7570515';
    }

    async getUsers(){
        let result = await this.contract.getAllBeneficiaries({from: this.ownerAddress})
        // only accounts for positive case
        return {registered: result[0]}
    }

    async getUser(address){
        return await this.contract.getBeneficiary(address, {from: this.ownerAddress});
    }

    // @todo refactor for DRY -- for sake of getting functional, copying and pasting code. 
    // also need to derive gas prices
    async addUser(originator, benefactor){

        let abiMethod = _.find(this.contract.abi, function(item) { return item.name == 'addParticipant'})
        let data = ethAbi.encodeMethod(abiMethod, [originator, benefactor])

        let nonce = await this.eth.getTransactionCount(this.ownerAddress)
        
        return await this.eth.sendRawTransaction(sign({
            to: this.contractAddress,
            value: 0,
            gas: new BN('300000'),
            // when sending a raw transactions it's necessary to set the gas price, currently 0.00000002 ETH
            gasPrice: new BN('20000000000'),
            nonce: nonce,
            data: data
          }, this.pvtKey))
    }

    async deleteUser(address){

        let abiMethod = _.find(this.contract.abi, function(item) { return item.name == 'removeParticipant'})
        let data = ethAbi.encodeMethod(abiMethod, [address])

        let nonce = await this.eth.getTransactionCount(this.ownerAddress)

        return await this.eth.sendRawTransaction(sign({
            to: this.contractAddress,
            value: 0,
            gas: new BN('300000'),
            // when sending a raw transactions it's necessary to set the gas price, currently 0.00000002 ETH
            gasPrice: new BN('20000000000'),
            nonce: nonce,
            data: data
          }, this.pvtKey))

        //return await this.contract.removeParticipant(address, {from: this.ownerAddress})
    }

    async updateUser(originator, beneficiary){

        let abiMethod = _.find(this.contract.abi, function(item) { return item.name == 'updateParticpant'})

        let data = ethAbi.encodeMethod(abiMethod, [originator, beneficiary])

        let nonce = await this.eth.getTransactionCount(this.ownerAddress)
        
        return await this.eth.sendRawTransaction(sign({
            to: this.contractAddress,
            value: 0,
            gas: new BN('300000'),
            // when sending a raw transactions it's necessary to set the gas price, currently 0.00000002 ETH
            gasPrice: new BN('20000000000'),
            nonce: nonce,
            data: data
          }, this.pvtKey))

        //return await this.contract.updateParticpant(address, {from: this.ownerAddress})
    }

    // async isValid(address){
    //     return await this.contract.isValidParticipant(address)
    // }
}

module.exports = RegistryService;