var userModel = require('../models/userModel');
var Web3Service = require('../services/web3Service');

class RegistryService{
    constructor(){  
        this.web3Svc = new Web3Service();    
     }

    getUserForAddress(userAddress){
        this.testWeb3Connection();

        if(userAddress === "test"){
            return userModel("Mark", "theaddress");
        }        
        return {};
    }

    addUserToRegistry(userAddress, userId){
        let web3Svc = this.web3Svc;
        web3Svc.addToRegistry
        return userModel(userId, userAddress);
    }

    testWeb3Connection(){
        let web3Svc = new Web3Service();
        web3Svc.startedOk();
    }

}

module.exports = RegistryService;