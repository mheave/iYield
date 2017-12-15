const Web3 = require('web3')
const userModel = require('../models/userModel');

class Web3Service{
    constructor(){}

    
    startedOk(){
        //this.getAllBeneficiaries();
        //this.addToRegistry();
        // this.getAllBeneficiaries();
        //this.getBalance();
    }

    addToRegistry(){
        let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));        
        var contract = new web3.eth.Contract(this.abiString(),"0x4cca94d9e3be68f8329b6af1363b8ea2b10e4273");
        let from = "0x1313734d2d6625173278978ddaa7b63400462745";
        // contract.options.gasPrice = '20000000000000'; 
        // contract.options.gas = 5000000;   
        contract.addParticipant("0xf5b3ba922aa89faa79d6b285243968654c05071e", "0xf5b3ba922aa89faa79d6b285243968654c05071e", {from: from})
        .then(result => {
            // so we actually need to build and sign the tx on the server
            // return transaction id
            // on success???
            // or do we need to do more
            console.log(result)
        })
        .catch(err => {
            console.log('oops, something went wrong.')
        })
        // call function 
        //benezzz.call().then(function(result){ console.log(result);}, function(err){console.log(err)});
    }    

    getAllBeneficiaries(){
        let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));        
        var contract = new web3.eth.Contract(this.abiString(),"0x7805ce3889d8622c70e8bad5b08238f8acdce3c7");
        contract.options.from = "0xb5eef95c22328f89c0eac0ee28aab8d947daa321";
        contract.options.gasPrice = '20000000000000'; 
        contract.options.gas = 5000000;        
        console.log(contract);
        var benezzz = contract.methods.getAllBeneficiaries();
        benezzz.call().then(function(result){ console.log(result);}, function(err){console.log(err)});
    }

    getBalance(){
        console.log("getting balance")
        let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));        
        let balance = web3.eth.getBalance("0xb5eef95c22328f89c0eac0ee28aab8d947daa321");
        balance.then(function(result) {
            console.log(result); // "Stuff worked!"
          }, function(err) {
            console.log(err); // Error: "It broke"
          });
    }

    abiString(){
        return [{"constant":false,"inputs":[{"name":"_originator","type":"address"},{"name":"_beneficiary","type":"address"}],"name":"updateParticpant","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAllBeneficiaries","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_account","type":"address"}],"name":"getBeneficiary","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_originator","type":"address"}],"name":"removeParticipant","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_originator","type":"address"}],"name":"isValidParticipant","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_originator","type":"address"},{"name":"_beneficiary","type":"address"}],"name":"addParticipant","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Register","outputs":[{"name":"beneficiary","type":"address"},{"name":"index","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"originator","type":"address"},{"indexed":true,"name":"beneficiary","type":"address"}],"name":"ParticipantAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"originator","type":"address"},{"indexed":true,"name":"beneficiary","type":"address"}],"name":"ParticipantUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"originator","type":"address"}],"name":"ParticipantRemoved","type":"event"}];
    }

}

module.exports = Web3Service;