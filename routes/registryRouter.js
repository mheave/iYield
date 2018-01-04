const express = require('express');
let registryRouter = express.Router();
const RegistryService = require('../services/RegistryService');

// Get all user entries
registryRouter.get('/registry', async function(req, res) {
    let regService = new RegistryService();
    let responseJson = await regService.getUsers(req.params.address);
    return res.json(responseJson);
  });

// Get entry for specific user
registryRouter.get('/registry/:address', async function(req, res) {
    let regService = new RegistryService();
    let responseJson = await regService.getUser(req.params.address);
    return res.json(responseJson);
  });

  // Create new. Originator and Beneficiary are same
  registryRouter.post('/registry/:address', async function(req, res){
    let regService = new RegistryService();
    let responseJson = await regService.addUser(req.params.address, req.params.address);
    return res.json(responseJson);
});

  // Create new. Originator and Beneficiary are different
  registryRouter.post('/registry/:originator/:beneficiary', async function(req, res){
    let regService = new RegistryService();
    let responseJson = await regService.addUser(req.params.originator, req.params.beneficiary);
    return res.json(responseJson);
});

// Remove entry
registryRouter.delete('/registry/:address', async function(req, res){
    let regService = new RegistryService();
    let responseJson = await regService.deleteUser(req.params.address);
    return res.json(responseJson);
});

// Update beneficiary
registryRouter.patch('/registry/:originator/:newBeneficiary', async function(req, res){
    let regService = new RegistryService();
    let responseJson = await regService.updateUser(req.params.originator, req.params.newBeneficiary);
    return res.json(responseJson);
});

module.exports = registryRouter;