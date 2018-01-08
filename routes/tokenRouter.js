const express = require('express');
let tokenRouter = express.Router();
const TokenService = require('../services/TokenService');

tokenRouter.post('/tokens/:beneficiary', async function(req, res){
    let tokenService = new TokenService();
    let responseJson = await tokenService.buyTokens(req.params.beneficiary);
    return res.json(responseJson);
});


tokenRouter.post('/tokens/purchase/:beneficiary.:currency.:currencyAmount.:tokenAmount', async function(req, res){
    let tokenService = new TokenService();
    let responseJson = await tokenService.currencyTokenPurchase(req.params.beneficiary, req.params.currency, req.params.currencyAmount, req.params.tokenAmount);
    return res.json(responseJson);
});

tokenRouter.get('/tokens', async function(req, res){
    let tokenService = new TokenService();
    let responseJson = await tokenService.adminPermittedToPurchase();
    return res.json(responseJson);
});


module.exports = tokenRouter;