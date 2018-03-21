const storage = require('node-persist');
const _ = require('lodash');

const ConfigurationService = require('./ConfigurationService');

class LocalStorageService
{
    constructor(){
       storage.initSync();
       this.configurationService = new ConfigurationService();
       this.setLocalStorageKeys();
    }    

    setLocalStorageKeys(){      
        this.localStorageSettings = this.configurationService.getLocalStorageSettings();
    }

    addTransactionToPendingList(transaction){
        this.addItemToList(this.localStorageSettings.pendingTransactionsKey, transaction);
    }    

    addItemToSpentTransactionList(spentTransaction){
        this.addItemToList(this.localStorageSettings.spentTransactionsKey, spentTransaction);
    }

    addItemToList(listKey, item){
        let itemArray = this.getItemFromStorage(listKey);
        if(itemArray == undefined || itemArray === null){
            itemArray = [];
        }
        itemArray.push(item);
        this.saveItemToStorage(listKey, itemArray);
    }

    addOrUpdateItemInStorage(key, item){
        let existingItem = this.getItemFromStorage(key);

        if(existingItem === undefined || existingItem === null){
            this.saveItemToStorage(key, item);            
        }
        else{
            this.refreshStore(key, item);
        }
    }

    refreshStore(key, item){
        storage.removeItemSync(key);
        this.saveItemToStorage(key, item);
    }

    getItemFromStorage(key){
        return storage.getItemSync(key);
    }

    saveItemToStorage(key, item){
        storage.setItemSync(key, item);
    }
}

module.exports = LocalStorageService;