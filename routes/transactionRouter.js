const express = require('express');
let transactionRouter = express.Router();
const TransactionService = require('../services/TransactionService');
const apiResponseModel = require('../models/ApiResponseModel');

transactionRouter.get('/transaction/:txHash', async function(req, res){
    let transactionService = new TransactionService();
    let getTransactionStatusResponse = await transactionService.getTransactionStatus(req.params.txHash);
    let responseModel = apiResponseModel(getTransactionStatusResponse);
    return res.json(responseModel);    
});

// Gets the current status of the transaction live from the network. If mined, returns txReceipt
transactionRouter.get('/transaction/network/:txHash', async function(req, res){
    let transactionService = new TransactionService();
    let txStatus = await transactionService.getTransactionStatusFromNetwork(req.params.txHash);
    let responseModel = apiResponseModel(txStatus);
    return res.json(responseModel);
});

module.exports = transactionRouter;