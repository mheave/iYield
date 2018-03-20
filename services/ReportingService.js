const ConfigurationService = require('./ConfigurationService');
const EthService = require('./EthService');
const TransactionService = require('./TransactionService');
const RegistryService = require('./RegistryService');
const unit = require('ethjs-unit');
const errorModel = require('../models/errorModel');


const buyTokensGasCost = 1000000;
const gasPrice = 20000000000;

class ReportingService {
    constructor(){  
        this.transactionService = new TransactionService();   
  
        let configurationService = new ConfigurationService();
        this.ethService = new EthService();             
    }

 

}

module.exports = PreSaleAnalysisService;
