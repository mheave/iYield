var Web3 = require('web3')

class Web3Service{
    constructor(){}

    
    startedOk(){
        //this.getAllBeneficiaries();
        this.addToRegistry();

    }

    addToRegistry(){
        let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));        
        var contract = new web3.eth.Contract(this.abiString(),"0x95e409a7eb040bdefb82c6bee73729a772139864");
        contract.options.from = "0x15e2a43bffdd944830f3a82d5b469b3da73e198d";
        var benezzz = contract.methods.addParticipant("0xf5b3ba922aa89faa79d6b285243968654c05071e", "0xf5b3ba922aa89faa79d6b285243968654c05071e");
        benezzz.call().then(function(result){ console.log(result);}, function(err){console.log(err)});
    }    

    getAllBeneficiaries(){
        var contract = new web3.eth.Contract(this.abiString(),"0x95e409a7eb040bdefb82c6bee73729a772139864");
        contract.options.from = "0x15e2a43bffdd944830f3a82d5b469b3da73e198d";
        console.log(contract);
        var benezzz = contract.methods.getAllBeneficiaries();
        benezzz.call().then(function(result){ console.log(result);}, function(err){console.log(err)});
    }

    getBalance(){
        console.log("getting balance")
        let balance = web3.eth.getBalance("0x15e2a43bffdd944830f3a82d5b469b3da73e198d");
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