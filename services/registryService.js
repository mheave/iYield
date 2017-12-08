var userModel = require('../models/userModel');
var Web3Service = require('../services/web3Service');

class RegistryService{
    constructor(){   }

    getUserForAddress(userAddress){
        this.testWeb3Connection();

        if(userAddress === "test"){
            return userModel("Mark", "theaddress");
        }        
        return {};
    }

    addUserToRegistry(userAddress, userId){
        return userModel(userId, userAddress);
    }

    testWeb3Connection(){
        let web3Svc = new Web3Service();
        web3Svc.startedOk();
    }

}

module.exports = RegistryService;