var userModel = require('../models/userModel');
//var Web3Service = require('../services/web3Service');
const Eth = require('ethjs');

// we need to import defaults
//const eth = 
// just include ethjs
// and kick out web3 service
// create the contract in the constructor and then make the call

class RegistryService{
    constructor(abi, contractAddress){  
        // set default in function or var or file
        this.abi = abi || [{"constant":false,"inputs":[{"name":"_originator","type":"address"},{"name":"_beneficiary","type":"address"}],"name":"updateParticpant","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAllBeneficiaries","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_account","type":"address"}],"name":"getBeneficiary","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_originator","type":"address"}],"name":"removeParticipant","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_originator","type":"address"}],"name":"isValidParticipant","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_originator","type":"address"},{"name":"_beneficiary","type":"address"}],"name":"addParticipant","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Register","outputs":[{"name":"beneficiary","type":"address"},{"name":"index","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"originator","type":"address"},{"indexed":true,"name":"beneficiary","type":"address"}],"name":"ParticipantAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"originator","type":"address"},{"indexed":true,"name":"beneficiary","type":"address"}],"name":"ParticipantUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"originator","type":"address"}],"name":"ParticipantRemoved","type":"event"}];
        this.contractAddress = /*contractAddress ||*/ '0x4cca94d9e3be68f8329b6af1363b8ea2b10e4273';
        this.eth = new Eth(new Eth.HttpProvider('http://127.0.0.1:8545'));
        //this.eth.contract(this.abi).at(this.contractAddress);
        this.contract = new this.eth.contract(this.abi).at(this.contractAddress);
        this.ownerAddress = '0x1313734d2D6625173278978DDaa7B63400462745';
        this.pvtKey = '673a54beee87f667d9204d314433b04e49011d1a4caa74bf166830d6d7570515';
    }

    // getUserForAddress(userAddress){
    //     this.testWeb3Connection();

    //     if(userAddress === "test"){
    //         return userModel("Mark", "theaddress");
    //     }        
    //     return {};
    // }

    addUserToRegistry(originator, benefactor){
        //const contract = new this.eth.contract/*.addParticipant(originator, benefactor)*/
        //console.log(contract)
        this.contract.addParticipant(originator, benefactor, {from: '0x1313734d2D6625173278978DDaa7B63400462745', gas: 100000})
        .then(res => {
            console.log('res: ', res)
        })
        .catch(err => {
            console.log('catch: ', err)
        })
        // console.log(this.eth.contr)
        // return 'poo';
        // let web3Svc = this.web3Svc;
        // web3Svc.addToRegistry();  // should that be a function call?
        // return userModel(userId, userAddress);
    }

    // testWeb3Connection(){
    //     let web3Svc = new Web3Service();
    //     web3Svc.startedOk();
    // }

    // defaultAbi(){   
    //     return 
    // }



}

module.exports = RegistryService;