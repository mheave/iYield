const _ = require('lodash');

const LocalStorageService = require('./LocalStorageService');
const EthService = require('./EthService');


const transactionPendingLabel = 'pending';
const transactionMinedLabel = 'mined';

class TransactionService
{
    constructor(){
        this.localStorageService = new LocalStorageService();       
        this.pendingTransactionStorageKey = this.localStorageService.localStorageSettings.pendingTransactionsKey;
    }

    addTransactionToPendingList(transaction){
        this.localStorageService.addTransactionToPendingList(transaction);
    }       
    
    setPendingTransactionToComplete(spentTransaction){
        let txHash = spentTransaction.txReceipt.transactionHash;
        let pendingTransactionsList = this.getPendingTransactions();
        let txIndex = _.findIndex(pendingTransactionsList, {transactionHash: txHash});
        _.pullAt(pendingTransactionsList, txIndex);

        this.localStorageService.refreshStore(this.pendingTransactionStorageKey, pendingTransactionsList);
        this.localStorageService.addItemToSpentTransactionList(spentTransaction);
    }    

    getPendingTransactions(){     
        let pendingTransctions = this.localStorageService.getItemFromStorage(this.pendingTransactionStorageKey);
        if(pendingTransctions === undefined || pendingTransctions ===null || pendingTransctions.length === 0){
            return null;
        }        
        return pendingTransctions;
    }

    getTransactionStatus(transactionHash){

        // to be updated
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

}

module.exports = TransactionService;