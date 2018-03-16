const EthService = require('./EthService');
const LocalStorageService = require('./LocalStorageService');

class NonceService{
    constructor(){
        this.localStorageService = new LocalStorageService();
    }

    async serviceStartNonceReconciliation(){
        let localStorageSettings = this.localStorageService.localStorageSettings;
        let addressList = [localStorageSettings.registryContractAddress, localStorageSettings.mintableTokenContractAddress, localStorageSettings.iyPresaleContractAddress]
        
        for(let k = 0; k < addressList.length; k++){
            let address = addressList[k];
            let networkNonce = await this.getCurrentNetworkNonceForAddress(address);
            let localNonce = this.getCurrentNonceFromLocalStorage(address);

            if(networkNonce === localNonce){
                continue;
            }

            this.setCurrentNonceInLocalStorage(address, networkNonce);            
        }
    }

    async getCurrentNetworkNonceForAddress(address){
        let ethService = new EthService();     
        let nonce = await ethService.getCurrentNonceForAccount(address);
        let nonceValue = nonce.words[0];
        return nonceValue;
    }
   
    getCurrentNonceFromLocalStorage(address){
        let nonceValue = this.localStorageService.getItemFromStorage(address);
        return 
    }

    setCurrentNonceInLocalStorage(address, nonce){
        this.localStorageService.addOrUpdateItemInStorage(address, nonce);
    }


}

module.exports = NonceService;


