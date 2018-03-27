const express = require('express');
let registryRouter = express.Router();

const RegistryService = require('../services/RegistryService');
const ContractService = require('../services/ContractService');

const apiResponseModel = require('../models/ApiResponseModel');

// Get a llist of all the participants of the contract
registryRouter.get('/registry/allbeneficiaries', async function(req, res){
  let regService = new RegistryService();
  let getBeneficiariesResponse = await regService.getAllBeneficiaries();
  let responseModel = apiResponseModel(getBeneficiariesResponse);
  return res.json(responseModel);
});

registryRouter.get('/registry/isvalidparticipant/:address', async function(req, res){
  let privateKey = req.app.locals.privateKey;
  let regService = new RegistryService(privateKey);
  let isValidParticipant = await regService.isValidParticipant(req.params.address);
  let responseModel = apiResponseModel(isValidParticipant);
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
  let privateKey = req.app.locals.privateKey;  
  let regService = new RegistryService(privateKey);
  let addUserResponse = await regService.addUser(req.params.address, req.params.address);
  let responseModel = apiResponseModel(addUserResponse);
  return res.json(responseModel);
});

// Create new. Originator and Beneficiary are different
registryRouter.post('/registry/:originator/:beneficiary', async function(req, res){
  let privateKey = req.app.locals.privateKey;
  let regService = new RegistryService(privateKey);
  let responseJson = await regService.addUser(req.params.originator, req.params.beneficiary);
  let responseModel = apiResponseModel(responseJson);  
  return res.json(responseModel);
 });

module.exports = registryRouter;