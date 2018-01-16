const BlockModel = require('../models/blockchain/BlockModel');
const transactionModel = require('../models/blockchain/transactionModel');


class BlockAnalysisService
{
    constructor(){ }    

    analyseBlockAndReturnModel(block){
        console.log("analysing block...");
        let blockModel = this.generateBlockModelFromBlock(block);
        console.log(blockModel);
        return blockModel;
    }

    generateBlockModelFromBlock(block){
        let blockHash = block.hash;
        let transactionsRaw = block.transactions;
        let tranasctions = [];
        for (var i = 0, len = transactionsRaw.length; i < len; i++) {
            let transaction = this.generateTransactionModelFromBlockTransaction(transactionsRaw[i]);
            tranasctions.push(transaction);
        }
        let blockModel = BlockModel(blockHash, tranasctions);
        return blockModel;
    }

    generateTransactionModelFromBlockTransaction(transaction){
        let hash = transaction.hash;
        let value = transaction.value;
        return transactionModel(hash, value);
    }

}

module.exports = BlockAnalysisService;