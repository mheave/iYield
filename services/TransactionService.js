var ycTransactionModel = require('../models/ycTransactionModel');
var NonceService = require('../services/NonceService');

class TransactionService{
    constructor(){
        this.nonceService = new NonceService();
    }

    issueCoins(contractId){
        let currentNonce = this.nonceService.getCurrentNonceForContract(contractId);
        console.log("current nonce: " + currentNonce);
    }
}

module.exports = TransactionService;
