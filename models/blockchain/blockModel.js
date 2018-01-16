function BlockModel(hash, transactions){
    return {
        hash: hash,
        transactions: transactions
    };
}

module.exports = BlockModel;