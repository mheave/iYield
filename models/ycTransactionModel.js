function ycTransactionModel(txid, contractid, payload, status, created, updated){
    return {
        txid: txid,
        contractid: contractid,
        payload: payload,
        status: status,
        created: created,
        updated: updated
    };
}

module.exports = ycTransactionModel;