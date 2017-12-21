const express = require('express');
let router = express.Router();
var TransactionService = require('../services/TransactionService');

router.get('/testissuecoins', async function(req, res) {
   let transactionService = new TransactionService();
   transactionService.issueCoins(1);
   console.log("coins issued...");
    return res.json("ok");
  });

  module.exports = router;