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
        if(pendingTransctions === undefined || pendingTransctions ===null || pendingTransctions.length === 0){
            return null;
        }        
        return pendingTransctions;
    }

    getTransactionStatus(transactionHash){
        let pendingTransactionPosition = this.indexPostitionOfTransactionInPendingList(transactionHash);
        if(pendingTransactionPosition>-1){
            return {status: transactionPendingLabel };
        }

        return { status: transactionMinedLabel };
    }

    indexPostitionOfTransactionInPendingList(txHash){
        let pendingTransactions = this.getPendingTransactions();
        if(pendingTransactions === null){
            return -1;
        }   

        let txHashPosition = _.findIndex(pendingTransactions, {transactionHash: txHash});
        return txHashPosition;
    }

    setPendingTransactionsToCompleted(currentPendingTransactions, transactionHashesToUpdate){
        let updatedTransactions = 0;
        for (var i = 0, len = currentPendingTransactions.length; i < len; i++) {
            let pendingTransaction = currentPendingTransactions[i];
            let matchingTransactionIndex = _.findIndex(transactionHashesToUpdate, (hash) => { return hash === pendingTransaction.transactionHash});
            if(matchingTransactionIndex > -1){
                pendingTransaction.status = transactionMinedLabel;              
                this.localStorageService.addItemToList(this.localStorageSettings.iYieldTransactionsKey, pendingTransaction);
                _.pullAt(currentPendingTransactions, i);
                _.pullAt(transactionHashesToUpdate, matchingTransactionIndex);  
                updatedTransactions++;
            }
        }
        if(updatedTransactions > 0){
            this.localStorageService.refreshStore(this.localStorageSettings.pendingIYieldTransactionsKey, currentPendingTransactions)
        }
    }

    updatePendingTransactionsFromTransactionsInBlockAndReturnUpdatedCount(blockModel){
        let currentPendingTransactions = this.getPendingTransactions();       
        if(currentPendingTransactions === null){
            return 0;
        }

        let transactionHashesToUpdate = [];
        for (var i = 0, len = currentPendingTransactions.length; i < len; i++) {
            let pendingTransaction = currentPendingTransactions[i];
            let blockModelTransaction = _.findIndex(blockModel.transactions, { hash: pendingTransaction.transactionHash });
            if(blockModelTransaction > -1){
                transactionHashesToUpdate.push(pendingTransaction.transactionHash);
            }
        }        
        if(transactionHashesToUpdate.length > 0){
            this.setPendingTransactionsToCompleted(currentPendingTransactions, transactionHashesToUpdate);
        }
        return transactionHashesToUpdate.length;
    }    
}

module.exports = TransactionService;