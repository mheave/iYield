const EthService = require('./EthService');
const LocalStorageService = require('./LocalStorageService');
const NonceModel = require('../models/blockchain/nonceModel');

class NonceService{
    constructor(){
        this.localStorageService = new LocalStorageService();
        this.localStorageSettings = this.localStorageService.localStorageSettings;
    }

    async syncNoncesWithNetwork(){
        let addressList = this.getArrayOfContractAddresses();                
        for(let k = 0; k < addressList.length; k++){            
            let address = addressList[k];
            let networkNonce = await this.getCurrentNetworkNonceForAddress(address);            
            this.reconcileNonceForAddress(address, networkNonce);           
        }
    }

    reconcileNonceForAddress(address, networkNonce){
        let nonceSettings = this.getNonceSettingsFromLocalStorage(address);
        if (nonceSettings != undefined && nonceSettings.currentBlockValue){
            // nonce in sync
            if(nonceSettings.currentBlockValue === networkNonce){
                return;
            }
            //update object
            nonceSettings = this.resolveNonceModel(nonceSettings, networkNonce);
        }
        else{
            // create new entry
            nonceSettings = this.createNonceModel(address, networkNonce);
        }
         this.saveNonceSettingsToLocalStorage(address, nonceSettings); 
    }

    resolveNonceModel(model, networkNonce){
        if(model.nextAvailble < networkNonce + 1){
            model.nextAvailble = networkNonce + 1;
        }
        if(model.lastSent < networkNonce){
            model.lastSent = networkNonce;
        }
        model.currentBlockValue = networkNonce;
        return model;
    }

    createNonceModel(address, networkNonce){
        return NonceModel(address, networkNonce+1, networkNonce, networkNonce);
    }

    getNextAvailableNonceForAddress(address){
        let nonceSettings = this.getNonceSettingsFromLocalStorage(address);

        if(nonceSettings && nonceSettings.nextAvailble){
            let availableNonce = nonceSettings.nextAvailble;
            nonceSettings.nextAvailble++;
            this.saveNonceSettingsToLocalStorage(address, nonceSettings); 
            return availableNonce;
        }

        return -1;
    }

    setLastSentTransactionNonceForAddress(address, lastSentNonce){
        let nonceSettings = this.getNonceSettingsFromLocalStorage(address);
        if(nonceSettings && nonceSettings.lastSent){
            nonceSettings.lastSent = lastSentNonce;
            if(nonceSettings.nextAvailble <= lastSent){
                nonceSettings.nextAvailble = lastSentNonce + 1;
            }
            this.saveNonceSettingsToLocalStorage(address, nonceSettings); 
        }
    }

    async getCurrentNetworkNonceForAddress(address){
        let ethService = new EthService();     
        let nonce = await ethService.getCurrentNonceForAccount(address);
        let nonceValue = nonce.words[0];
        return nonceValue;
    }
   
    getNonceSettingsFromLocalStorage(address){
        let settings = this.localStorageService.getItemFromStorage(address);
        return settings;
    }

    saveNonceSettingsToLocalStorage(address, nonce){
        this.localStorageService.addOrUpdateItemInStorage(address, nonce);
    }

    getArrayOfContractAddresses(){
        let addressArray = [this.localStorageSettings.registryContractAddress, this.localStorageSettings.mintableTokenContractAddress, this.localStorageSettings.iyPresaleContractAddress];
        return addressArray;
    }
}

module.exports = NonceService;


