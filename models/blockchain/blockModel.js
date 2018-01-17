function BlockModel(blockNumber,hash, transactions){
    return {
        blockNumber: blockNumber,
        hash: hash,
        transactions: transactions
    };
}

module.exports = BlockModel;