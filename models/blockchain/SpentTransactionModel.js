function SpentTransactionModel(name, txHash, status, pendingTxModel, txReceipt, contractEvents){
    return {
        name: name,
        txHash: txHash,
        status: status,
        pendingTxModel: pendingTxModel,
        txReceipt: txReceipt,
        contractEvents: contractEvents
    };
}

module.exports = SpentTransactionModel;
