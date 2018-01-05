const express = require('express');
let tokenRouter = express.Router();
const TokenService = require('../services/TokenService');

tokenRouter.post('/tokens/:beneficiary', async function(req, res){
    let tokenService = new TokenService();
    let responseJson = await tokenService.buyTokens(req.params.beneficiary);
    return res.json(responseJson);
});

module.exports = tokenRouter;