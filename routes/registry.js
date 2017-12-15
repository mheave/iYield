const express = require('express');
let router = express.Router();
var RegistryService = require('../services/registryService');

// just put everying thing straight in here and then factor it out in to a service
// so we can take localhost or another provider
// create constructor when launching api 
// should be using http verbs
const Eth = require('ethjs');
const eth = new Eth(new Eth.HttpProvider('https://rinkeby.infura.io'));


router.get('/registry/:userAddress', function(req, res, next) {
    let regService = new RegistryService();
    console.log("calling RegistryService.getUserForAddress");
    let responseJson = regService.getUserForAddress(req.params.userAddress);
    res.json(responseJson);
    next()
  });

  router.post('/registry/:address', function(req, res){

    res.send('hello world');
    let regService = new RegistryService();
    let responseJson = regService.addUserToRegistry(req.params.address);
    res.json(responseJson);
});


// in this instance we assume from and to addresses will be the same
router.delete('/registry/:address', function(req, res){
    // let regService = new RegistryService();
    // let userAddress = req.body.userAddress;
    // let userId = req.body.userId;
    // let responseJson = regService.addUserToRegistry(userAddress, userId);
    // res.json(responseJson);
});

router.patch('/registry/:address', function(req, res){
    // let regService = new RegistryService();
    // let userAddress = req.body.userAddress;
    // let userId = req.body.userId;
    // let responseJson = regService.addUserToRegistry(userAddress, userId);
    // res.json(responseJson);
});

// router.post('/registry/create/:fromAddress/:toAddress', function(req, res){
//     let regService = new RegistryService();

//     // let userAddress = req.body.userAddress;
//     // let userId = req.body.userId;
//     let responseJson = regService.addUserToRegistry(userAddress, userId);
//     res.json(responseJson);
// });
  
module.exports = router;