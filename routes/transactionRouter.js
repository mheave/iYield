const express = require('express');
let transactionRouter = express.Router();
const TransactionService = require('../services/TransactionService');

transactionRouter.get('/transaction/:txHash', async function(req, res){
    let transactionService = new TransactionService();
    let responseJson = await transactionService.getTransactionStatus(req.params.txHash);
    return res.json(responseJson);
});




module.exports = transactionRouter;