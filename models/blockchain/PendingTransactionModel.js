function PendingTransactionModel(name, data, transactionHash, status){
    return {
        name: name,
        data: data,
        transactionHash: transactionHash,
        status: status
    };
}

module.exports = PendingTransactionModel;