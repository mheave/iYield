const ConfigurationService = require('./ConfigurationService');
const EthService = require('./EthService');
const TransactionService = require('./TransactionService');

const pendingTransactionModel = require('../models/blockchain/PendingTransactionModel');
const errorModel = require('../models/ErrorModel');

const gasCost = 1000000;
const gasPrice = 20000000000;

class ContractService {
    constructor(privateKey){  
        this.transactionService = new TransactionService();   
        this.ethService = new EthService();     
        let configurationService = new ConfigurationService(privateKey);             
        this.contractConfigModel = configurationService.getIyPresaleContractConfig();
    }

    async getPauseState(){
        try{
            let contract = await this.ethService.getContractFromConfig(this.contractConfigModel);
            let isPaused = await contract.isPaused();
            return { isPaused: isPaused };
        }
        catch(error){
            return errorModel("ContractService.getPauseState", {}, error.message, error.stack);
        }
    }    

    async setPausedState(pauseState){
        try{
            let data = this.ethService.createTransctionDataObject('setPauseState', [pauseState], this.contractConfigModel.abi);
            let txResult = await this.ethService.sendSignedTransaction(this.contractConfigModel, data, 0, gasCost, gasPrice); 
            if(!txResult.success){
                throw txResult.error;
            }
            let pendingTransaction = this.transactionService.createPendingTransaction('Contract.setPauseState', { pauseState: pauseState}, txResult.txHash);
            return pendingTransaction;
        }
        catch(error){
            return errorModel("Contract.setPauseState", { pauseState: pauseState } , error.message, error.stack);
        }
    } 

    async updateEndtime(datetime){
        try{
            let data = this.ethService.createTransctionDataObject('updateEndTime', [datetime], this.contractConfigModel.abi);
            let txResult = await this.ethService.sendSignedTransaction(this.contractConfigModel, data, 0, gasCost, gasPrice); 
            if(!txResult.success){
                throw txResult.error;
            }
            let pendingTransaction = this.transactionService.createPendingTransaction('Contract.updateEndTime', { datetime: datetime}, txResult.txHash);            
            return pendingTransaction;
        }
        catch(error){
            return errorModel("Contract.updateEndTime", { datetime: datetime } , error.message, error.stack);
        }
    }     
}

module.exports = ContractService;