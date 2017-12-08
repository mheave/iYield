var userModel = require('../models/userModel.js');

class RegistryService{
    constructor(){

    }

    getUserForAddress(userAddress){
        if(userAddress === "test"){
            return userModel("Mark", "theaddress");
        }
        
        return {};
    }

    addUserToRegistry(userAddress, userId){

        return userModel(userId, userAddress);

    }

}

module.exports = RegistryService;