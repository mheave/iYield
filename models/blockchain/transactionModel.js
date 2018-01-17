function transactionModel(hash, value, blockNumber){
    return {
        hash: hash,
        value: value,
        blockNumber: blockNumber
    };
}

module.exports = transactionModel;