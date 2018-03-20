const BlockModel = require('../models/blockchain/blockModel');
const transactionModel = require('../models/blockchain/transactionModel');
const TransactionService = require('./TransactionService');



class BlockAnalysisService
{
    constructor(){ 
        this.transactionService = new TransactionService();
    }    

    analyseAndProcessBlock(block){
        let blockModel = this.generateBlockModelFromBlock(block);
        if(blockModel != null){
            let updatedTransactions = this.transactionService.updatePendingTransactionsFromTransactionsInBlockAndReturnUpdatedCount(blockModel);
            if(updatedTransactions > 0){
                console.log("iYield transactions found in block. Logs updated.");
                console.log(blockModel);    
                return blockModel;
            }       
            return null;
        }
        return null;
    }

    generateBlockModelFromBlock(block){
        let blockNumber = block.number.toNumber();
        let blockHash = block.hash;
        let transactionsRaw = block.transactions;
        if(transactionsRaw.length === 0){
            return null;
        }

        let transactionList = this.generateTransactionListFromRawBlockTransactions(transactionsRaw);
        let blockModel = BlockModel(blockNumber, blockHash, transactionList);
        return blockModel;
    }

    generateTransactionListFromRawBlockTransactions(transactionsRaw){
        let transactions = [];
        for (var i = 0, len = transactionsRaw.length; i < len; i++) {
            let transaction = this.generateTransactionModelFromBlockTransaction(transactionsRaw[i]);
            transactions.push(transaction);
        }
        return transactions;        
    }

    generateTransactionModelFromBlockTransaction(transaction){
        let hash = transaction.hash;
        let value = transaction.value;
        let blockNumber = transaction.blockNumber;
        return transactionModel(hash, value, blockNumber);
    }



}

module.exports = BlockAnalysisService;