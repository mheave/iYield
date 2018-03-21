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
        this.localStorageService.removeTransactionFromPendingList(txHash);
        this.localStorageService.addItemToSpentTransactionList(spentTransaction);
    }    


    getTransactionStatus(txHash){
        let pendingTransactionEntry = this.localStorageService.getTransactionFromPendingList(txHash);
        if(pendingTransactionEntry){
            return { status: transactionPendingLabel, tx: pendingTransactionEntry }
        }

        let spentTransactionEntry = this.localStorageService.getTransactionFromSpentList(txHash);
        if(spentTransactionEntry){
            return {status: transactionMinedLabel, tx: spentTransactionEntry };
        }       

        return { status: "unknown TX", tx: null };
    }

    async getTransactionStatusFromNetwork(txHash){
        
        let ethService = new EthService();
        let txReceipt = await ethService.getTransactionReceiptFromNetwork(txHash);
        if(txReceipt != null){
            return { status: "mined", txReceipt: txReceipt};
        }
        return {status: "pending", txReceipt: null};
    }



}

module.exports = TransactionService;