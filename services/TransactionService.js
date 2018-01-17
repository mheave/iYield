const transactionModel = require('../models/blockchain/transactionModel');
const LocalStorageService = require('./LocalStorageService');
const ConfigurationService = require('./ConfigurationService');
const _ = require('lodash');

const transactionPendingLabel = 'pending';
const transactionMinedLabel = 'mined';

class TransactionService
{
    constructor(){
        this.localStorageService = new LocalStorageService();
        this.setLocalStorageKeys();
    }

    setLocalStorageKeys(){      
        let configurationService = new ConfigurationService();
        this.localStorageSettings = configurationService.getLocalStorageSettings();
    }

    addTransactionToPendingList(transaction){
        transaction.status = transactionPendingLabel;
        this.localStorageService.addItemToList(this.localStorageSettings.pendingIYieldTransactionsKey, transaction);
    }        

    getPendingTransactions(){
        let pendingTransctions = this.localStorageService.getItemFromStorage(this.localStorageSettings.pendingIYieldTransactionsKey);
        return pendingTransctions;
    }

    setPendingTransactionsToCompleted(transactionHashesToUpdate){
        let pendingTransactions = this.localStorageService.getItemFromStorage(this.localStorageSettings.pendingIYieldTransactionsKey);
        let updatedTransactions = 0;
        for (var i = 0, len = pendingTransactions.length; i < len; i++) {
            let pendingTransaction = pendingTransactions[i];
            let matchingTransactionIndex = _.indexOf(transactionHashesToUpdate, pendingTransaction.transactionHash);
            if(matchingTransactionIndex > -1){
                pendingTransaction.status = transactionMinedLabel;              
                this.localStorageService.addItemToList(this.localStorageSettings.iYieldTransactionsKey, pendingTransaction);
                _.pullAt(pendingTransactions, i);
                _.pullAt(transactionHashesToUpdate, matchingTransactionIndex);  
                updatedTransactions++;
            }
        }
        if(updatedTransactions > 0){
            this.localStorageService.refreshStore(this.localStorageSettings.pendingIYieldTransactionsKey, pendingTransactions)
        }
    }

    updatePendingTransactionsFromTransactionsInBlockAndReturnUpdatedCount(blockModel){
        let currentPendingTransactions = this.getPendingTransactions();       
        if(currentPendingTransactions === undefined || currentPendingTransactions.length === 0){
            return 0;
        }
        let transactionHashesToUpdate = [];
        for (var i = 0, len = currentPendingTransactions.length; i < len; i++) {
            let pendingTransaction = currentPendingTransactions[i];
            let blockModelTransaction = _.find(blockModel.transactions, { hash: pendingTransaction.transactionHash });
            if(blockModelTransaction != undefined && blockModelTransaction != null){
                transactionHashesToUpdate.push(pendingTransaction.transactionHash);
            }
        }        
        if(transactionHashesToUpdate.length > 0){
            this.setPendingTransactionsToCompleted(transactionHashesToUpdate);
        }
        return transactionHashesToUpdate.length;
    }    
}

module.exports = TransactionService;