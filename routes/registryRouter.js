const express = require('express');
let registryRouter = express.Router();
const RegistryService = require('../services/RegistryService');
const apiResponseModel = require('../models/apiResponseModel');

// Get all user entries
registryRouter.get('/registry', async function(req, res) {
    let regService = new RegistryService();
    let getUsersResponse = await regService.getUsers(req.params.address);
    let responseModel = apiResponseModel(getUsersResponse);
    return res.json(responseModel);
});

registryRouter.get('/registry/allbeneficiaries', async function(req, res){
  let regService = new RegistryService();
  let getBeneficiariesResponse = await regService.getAllBeneficiaries();
  let responseModel = apiResponseModel(getBeneficiariesResponse);
  return res.json(responseModel);
});

// Get entry for specific user
registryRouter.get('/registry/:address', async function(req, res) {
    let regService = new RegistryService();
    let getUserResponse = await regService.getUser(req.params.address);
    let responseModel = apiResponseModel(getUserResponse);
    return res.json(responseModel);
});


// Create new. Originator and Beneficiary are same
registryRouter.post('/registry/:address', async function(req, res){
  let regService = new RegistryService();
  let addUserResponse = await regService.addUser(req.params.address, req.params.address);
  let responseModel = apiResponseModel(addUserResponse);
  return res.json(responseModel);
});

   // Create new. Originator and Beneficiary are different
   registryRouter.post('/registry/:originator/:beneficiary', async function(req, res){
     let regService = new RegistryService();
     let responseJson = await regService.addUser(req.params.originator, req.params.beneficiary);
     return res.json(responseJson);
 });




module.exports = registryRouter;