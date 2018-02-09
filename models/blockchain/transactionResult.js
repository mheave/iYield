function transactionResult(txResult){
    if(typeof txResult === "string"){
        return {
            txHash: txResult,
            error: null,
            success: true
        };
    }

    return { txHash: null, error: txResult, success: false};
}

module.exports = transactionResult;