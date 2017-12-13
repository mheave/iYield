var express = require('express');
var router = express.Router();
var RegistryService = require('../services/registryService')

router.get('/:userAddress', function(req, res, next) {
    let regService = new RegistryService();
    console.log("calling RegistryService.getUserForAddress");
    let responseJson = regService.getUserForAddress(req.params.userAddress);
    res.json(responseJson);
  });

router.post('/', function(req, res){
    let regService = new RegistryService();
    let userAddress = req.body.userAddress;
    let userId = req.body.userId;
    let responseJson = regService.addUserToRegistry(userAddress, userId);
    res.json(responseJson);
});
  
module.exports = router;