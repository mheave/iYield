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

transactionRouter.get('/transaction/network/:txHash', async function(req, res){
    let transactionService = new TransactionService();
    let txStatus = await transactionService.getTransactionStatusFromNetwork(req.params.txHash);
    let responseModel = apiResponseModel(txStatus);
    return res.json(responseModel);
});

module.exports = transactionRouter;