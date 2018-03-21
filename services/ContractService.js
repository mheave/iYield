const ConfigurationService = require('./ConfigurationService');
const EthService = require('./EthService');
const TransactionService = require('./TransactionService');

const pendingTransactionModel = require('../models/blockchain/PendingTransactionModel');
const errorModel = require('../models/ErrorModel');

const gasCost = 1000000;
const gasPrice = 20000000000;

class ContractService {
    constructor(){  
        this.transactionService = new TransactionService();   
        this.ethService = new EthService();     

        let configurationService = new ConfigurationService();             
        this.contractConfigModel = configurationService.getIyPresaleContractConfig();
        this.mintableContractConfig = configurationService.getMintableTokenContractConfig();
        this.ycContractConfig = configurationService.getYCTokenContractConfig();
    }

    async setPausedState(pauseState){
        try{
            let data = this.ethService.createTransctionDataObject('setPauseState', [pauseState], this.contractConfigModel.abi);
            let txResult = await this.ethService.sendSignedTransaction(this.contractConfigModel, data, 0, gasCost, gasPrice); 
            if(!txResult.success){
                throw txResult.error;
            }
            let pendingTransaction = pendingTransactionModel('Contract.setPauseState', { pauseState: pauseState}, txResult.txHash);
            this.transactionService.addTransactionToPendingList(pendingTransaction);
            return pendingTransaction;
        }
        catch(error){
            return errorModel("Contract.setPauseState", { pauseState: pauseState } , error.message, error.stack);
        }
    } 

}

module.exports = ContractService;