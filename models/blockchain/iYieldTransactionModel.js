function iYieldTransactionModel(transactionType, data, transactionHash, status){
    return {
        transactionType: transactionType,
        data: data,
        transactionHash: transactionHash,
        status: status
    };
}

module.exports = iYieldTransactionModel;