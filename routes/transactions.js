const express = require('express');
let router = express.Router();
var TransactionService = require('../services/TransactionService');
let config = require('../config');


router.get('/testissuecoins', async function(req, res) {
  // let transactionService = new TransactionService();
  //transactionService.issueCoins(1, function(result){
  // console.log(result[0]);
   console.log("coins issued...");
   return res.json("ok");
//  });
  });


  router.get('/testpurchasetokens', async function(req, res){
    let beneficiary = '0x1e93d02210f51b3cff6328a66904c833c2a1eab7';
    let endpoint = config.ethNetwork.endpoint;
    let abi = config.iyPresaleContract.abi;
    let contractAddress = config.iyPresaleContract.contractAddress;
    let ownerAddress = config.iyPresaleContract.ownerAddress;
    let privateKey = config.iyPresaleContract.ownerPrivateKey;
    
    
    let transactionService = new TransactionService(endpoint, abi, contractAddress, ownerAddress, privateKey);    
    await transactionService.buyTokens(beneficiary, function(result){
        console.log(result);
        return res.json("ok");
     });
  });

  router.get('/gettotalmigratedtokens', async function(req, res){
    let endpoint = config.ethNetwork.endpoint;
    let abi = config.iyPresaleContract.abi;
    let contractAddress = config.iyPresaleContract.contractAddress;
    let ownerAddress = config.iyPresaleContract.ownerAddress;
    let privateKey = config.iyPresaleContract.ownerPrivateKey;
    
    let transactionService = new TransactionService(endpoint, abi, contractAddress, ownerAddress, privateKey);    
    await transactionService.getTotalMigrated(function(result){
        console.log(result);
        return res.json("ok");
     });
  });



  

  module.exports = router;