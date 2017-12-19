const express = require('express');
let router = express.Router();
var RegistryService = require('../services/RegistryService');

//@todo refactor to make DRY

// Get all user entries
router.get('/registry', async function(req, res) {
    let regService = new RegistryService();
    let responseJson = await regService.getUsers(req.params.address);
    return res.json(responseJson);
  });

// Get entry for specific user
router.get('/registry/:address', async function(req, res) {
    let regService = new RegistryService();
    let responseJson = await regService.getUser(req.params.address);
    return res.json(responseJson);
  });

  // Create new. Originator and Beneficiary are same
  router.post('/registry/:address', async function(req, res){
    let regService = new RegistryService();
    let responseJson = await regService.addUser(req.params.address, req.params.address);
    return res.json(responseJson);
});

  // Create new. Originator and Beneficiary are different
  router.post('/registry/:originator/:beneficiary', async function(req, res){
    let regService = new RegistryService();
    let responseJson = await regService.addUser(req.params.originator, req.params.beneficiary);
    return res.json(responseJson);
});

// Remove entry
router.delete('/registry/:address', async function(req, res){
    let regService = new RegistryService();
    let responseJson = await regService.deleteUser(req.params.address);
    return res.json(responseJson);
});

// Update beneficiary
router.patch('/registry/:originator/:newBeneficiary', async function(req, res){
    let regService = new RegistryService();
    let responseJson = await regService.updateUser(req.params.originator, req.params.newBeneficiary);
    return res.json(responseJson);
});

module.exports = router;