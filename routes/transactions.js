const express = require('express');
let router = express.Router();

var DataAccessService = require('../services/DataAccessService');

router.get('/transaction/test', async function(req, res) {
    let dataAccessService = new DataAccessService();
    dataAccessService.testGetSomthing();
    return "ok";
  });


  module.exports = router;