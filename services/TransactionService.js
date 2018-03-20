const transactionModel = require('../models/blockchain/transactionModel');
const LocalStorageService = require('./LocalStorageService');
const EthService = require('./EthService');

const _ = require('lodash');

const transactionPendingLabel = 'pending';
const transactionMinedLabel = 'mined';

class TransactionService
{
    constructor(){
        this.localStorageService = new LocalStorageService();       
        this.pendingTransactionStorageKey = this.localStorageService.localStorageSettings.pendingIYieldTransactionsKey;
        this.iYieldTransactionsKey = this.localStorageService.localStorageSettings.iYieldTransactionsKey;        
    }

    addTransactionToPendingList(transaction){
        transaction.status = transactionPendingLabel;
        this.localStorageService.addItemToList(this.pendingTransactionStorageKey, transaction);
    }        

    getPendingTransactions(){     
        let pendingTransctions = this.localStorageService.getItemFromStorage(this.pendingTransactionStorageKey);
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

    async getTransactionStatusFromNetwork(txHash){
        let ethService = new EthService();
        let txStatus = await ethService.getTransactionStatusFromNetwork(txHash);
        if(txStatus != null && txStatus.blockNumber){
            return { status: "mined", blockNumber: txStatus.blockNumber.words[0]};
        }
        return {stauts: "unknown", blockNumber: null};
    }

    indexPostitionOfTransactionInPendingList(txHash){
        let pendingTransactions = this.getPendingTransactions();
        if(pendingTransactions === null){
            return -1;
        }   

        let txHashPosition = _.findIndex(pendingTransactions, {transactionHash: txHash});
        return txHashPosition;
    }

    async setPendingTransactionToComplete(txReceipt){
        let txHash = txReceipt.transactionHash;
        let pendingTransactionsList = this.getPendingTransactions();
        let txIndex = _.findIndex(pendingTransactionsList, {transactionHash: txHash});
        _.pullAt(pendingTransactionsList, txIndex);
        this.localStorageService.refreshStore(this.pendingTransactionStorageKey, pendingTransactionsList);
        this.localStorageService.addItemToList(this.iYieldTransactionsKey, txReceipt);
    }


}

module.exports = TransactionService;