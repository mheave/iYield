var userModel = require('../models/userModel');
var Web3Service = require('../services/web3Service');

// just include ethjs
// and kick out web3 service


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
        console.log('add user to reg')
        let web3Svc = this.web3Svc;
        web3Svc.addToRegistry();  // should that be a function call?
        return userModel(userId, userAddress);
    }

    testWeb3Connection(){
        let web3Svc = new Web3Service();
        web3Svc.startedOk();
    }

}

module.exports = RegistryService;