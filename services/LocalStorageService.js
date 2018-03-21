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

    removeTransactionFromPendingList(txHash){
        let pendingTransactionsList = this.getPendingTransactions();
        let txIndex = _.findIndex(pendingTransactionsList, {transactionHash: txHash});
        _.pullAt(pendingTransactionsList, txIndex);
        this.refreshStore(this.localStorageSettings.pendingTransactionsKey, pendingTransactionsList);
    }
    
    getTransactionFromPendingList(txHash){
        let pendingTransactions = this.getPendingTransactions();
        if(pendingTransactions === null){
            return null;
        }

        let txPosition = _.findIndex(pendingTransactions, {transactionHash: txHash});
        if(txPosition === undefined || txPosition === null || txPosition < 0){
            return null;
        }

        return pendingTransactions[txPosition];
    }

    getPendingTransactions(){     
        let pendingTransctions = this.getItemFromStorage(this.localStorageSettings.pendingTransactionsKey);
        if(pendingTransctions === undefined || pendingTransctions ===null || pendingTransctions.length === 0){
            return null;
        }        
        return pendingTransctions;
    }    

    addItemToSpentTransactionList(spentTransaction){
        this.addItemToList(this.localStorageSettings.spentTransactionsKey, spentTransaction);
    }

    getTransactionFromSpentList(txHash){
        let spentTransactions = this.getSpentTransactions();
        if(spentTransactions === null){
            return null;
        }

        let txPosition = _.findIndex(spentTransactions, {txHash: txHash});
        if(txPosition === undefined || txPosition === null || txPosition < 0){
            return null;
        }

        return spentTransactions[txPosition];
    }    

    getSpentTransactions(){     
        let spentTransactions = this.getItemFromStorage(this.localStorageSettings.spentTransactionsKey);
        if(spentTransactions === undefined || spentTransactions ===null || spentTransactions.length === 0){
            return null;
        }        
        return spentTransactions;
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