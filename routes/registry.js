const express = require('express');
let router = express.Router();
var RegistryService = require('../services/registryService');

// just put everying thing straight in here and then factor it out in to a service
// so we can take localhost or another provider
// create constructor when launching api 
// should be using http verbs
// const Eth = require('ethjs');
// //const eth = new Eth(new Eth.HttpProvider('https://rinkeby.infura.io'));
// const eth = new Eth(new Eth.HttpProvider('http://localhost:8545'));

router.get('/registry/:address', async function(req, res) {
    let regService = new RegistryService();
    let responseJson = await regService.getUser(req.params.address);
    return res.json(responseJson);
  });

  router.post('/registry/:address', async function(req, res){
    let regService = new RegistryService();
    let responseJson = await regService.addUser(req.params.address, req.params.address);
    return res.json(responseJson);
});


// in this instance we assume from and to addresses will be the same
// router.delete('/registry/:address', function(req, res){
//     let regService = new RegistryService();

//     let responseJson = regService.addUserToRegistry(userAddress, userId);
//     // res.json(responseJson);
// });

// router.patch('/registry/:address', function(req, res){
//     // let regService = new RegistryService();
//     // let userAddress = req.body.userAddress;
//     // let userId = req.body.userId;
//     // let responseJson = regService.addUserToRegistry(userAddress, userId);
//     // res.json(responseJson);
// });

// router.post('/registry/create/:fromAddress/:toAddress', function(req, res){
//     let regService = new RegistryService();

//     // let userAddress = req.body.userAddress;
//     // let userId = req.body.userId;
//     let responseJson = regService.addUserToRegistry(userAddress, userId);
//     res.json(responseJson);
// });
  
module.exports = router;