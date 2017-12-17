//https://github.com/ConsenSys/eth-signer
//https://web3js.readthedocs.io/en/1.0/web3-eth-abi.html#encodefunctioncall
//https://github.com/ethjs/ethjs-abi/blob/e63f92966179d9017b57c9eadef78384a6899a51/src/index.js#L113
var userModel = require('../models/userModel');
const Eth = require('ethjs');
const ethAbi = require('ethjs-abi');
//const config = require('../config')
// Need to unlock main account on node for this to work
//web3.personal.unlockAccount("0x1313734d2D6625173278978DDaa7B63400462745", '', 9999999);

class RegistryService{
    constructor(abi, contractAddress){  
        // set default in function or var or file... 
        this.abi = abi || [{"constant":false,"inputs":[{"name":"_originator","type":"address"},{"name":"_beneficiary","type":"address"}],"name":"updateParticpant","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAllBeneficiaries","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_account","type":"address"}],"name":"getBeneficiary","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_originator","type":"address"}],"name":"removeParticipant","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_originator","type":"address"}],"name":"isValidParticipant","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_originator","type":"address"},{"name":"_beneficiary","type":"address"}],"name":"addParticipant","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Register","outputs":[{"name":"beneficiary","type":"address"},{"name":"index","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"originator","type":"address"},{"indexed":true,"name":"beneficiary","type":"address"}],"name":"ParticipantAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"originator","type":"address"},{"indexed":true,"name":"beneficiary","type":"address"}],"name":"ParticipantUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"originator","type":"address"}],"name":"ParticipantRemoved","type":"event"}];
        this.contractAddress = contractAddress || '0x4cca94d9e3be68f8329b6af1363b8ea2b10e4273';
        this.eth = new Eth(new Eth.HttpProvider('http://127.0.0.1:8545'));
        this.contract = new this.eth.contract(this.abi).at(this.contractAddress);
        this.ownerAddress = '0x1313734d2D6625173278978DDaa7B63400462745';
        this.pvtKey = '673a54beee87f667d9204d314433b04e49011d1a4caa74bf166830d6d7570515';
    }

    async getUsers(){
        return await this.contract.getAllBeneficiaries({from: this.ownerAddress})
    }

    async getUser(address){
        return await this.contract.getBeneficiary(address, {from: this.ownerAddress});
    }

    async addUser(originator, benefactor){
        //console.log(ethAbi)
        // such a shit way to get values
        // ask q's about scope
        let abiMethod = this.contract.abi[6]
        //@see https://github.com/ethjs/ethjs-abi/blob/e63f92966179d9017b57c9eadef78384a6899a51/src/index.js#L113
        let data = ethAbi.encodeMethod(abiMethod, [originator, benefactor])
        
        //@todo check this is being encoded correctly
        //can use https://github.com/ConsenSys/abi-decoder
        
        
        // this is probably the problem righ here
        // try using web3 to encode
        // sendTransaction should sign for us
        // let signed = eth.sign(this.ownerAddress, data)
        // let testSendTransaction = await eth.sendTransaction({
        //     from: this.ownerAddress,
        //     to: this.contractAddress,
        //     value: '0',
        //     gas: '3000000',
        //     data: signed,
        // });
        

        const EthereumTx = require('ethereumjs-tx')
     //   const ethSigUtil = require('eth-sig-util')

        // need to get nonce first
        // might be easier to use web3
        let txParams = {
            nonce: '0x268',
            gasPrice: '0x09184e72a000',
            gasLimit: '0x9C40',
            to: this.contractAddress,
            value: '0x0',
            data: data,
        }

        let tx = new EthereumTx(txParams)
        tx.sign(Buffer.from(this.pvtKey, 'hex'))

        //let goo = 5

        return await eth.sendRawTransaction(tx.serialize().toString('hex'))
        // .then((result) => {
        //     console.log('sendrawtx', result)
        // })
        // .catch((error) => {
        //     console.log('Unable to send transaction: ', error)
        // })

        // let poo = 4;
        
        // let result = await eth.sendRawTransaction(tx.serialize().toString('hex'))
        // return result

       // return poo

         // return testSendTransaction;
        // now we want to sign with the data
        // then encode with data
        // also try an example with web3
        // eth.getCode will return bytes
        // element 6 in eth.contract abi is this function
        // set the gas explicitly cos internally makes bad guesstimate.
        //return await this.contract.addParticipant(originator, benefactor, {from: this.ownerAddress, gas: 100000});
    }

    async deleteUser(address){
        return await this.contract.removeParticipant(address, {from: this.ownerAddress})
    }

    async updateUser(address){
        return await this.contract.updateParticpant(address, {from: this.ownerAddress})
    }

    async isValid(address){
        return await this.contract.isValidParticipant(address)
    }
}

module.exports = RegistryService;