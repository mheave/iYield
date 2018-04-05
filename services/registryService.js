const ConfigurationService = require('./ConfigurationService');
const EthService = require('./EthService');
const TransactionService = require('./TransactionService');
const sign = require('ethjs-signer').sign;
const pendingTransactionModel = require('../models/blockchain/PendingTransactionModel');
const errorModel = require('../models/ErrorModel');

// Gas
// refactor this out into a service to allow configuration of gas
const gasPrice = 20000000000;
const addUserGasCost = 4712388;
const deleteUserGasCost = 4712388;
const updateUserGasCost = 4712388;

class RegistryService{
    constructor(privateKey){
        let configurationService = new ConfigurationService(privateKey);    
        this.contractConfigModel = configurationService.getRegistryContractConfig();                   
        this.transactionService = new TransactionService();
        this.ethService = new EthService();     
        this.contract = new this.ethService.eth.contract(this.contractConfigModel.abi).at(this.contractConfigModel.contractAddress);
    }

    async getAllBeneficiaries(){
        let result = await this.contract.getAllBeneficiaries({from: this.contractConfigModel.ownerAddress})
        if(result[0].length && result[0].length > 0){
            return result[0];
        }
        return [];
    }

    async getUser(address){
        return await this.contract.getBeneficiary(address, {from: this.contractConfigModel.ownerAddress});
    }

    async isValidParticipant(address){
        try{
            let result =  await this.contract.isValidParticipant(address, {from: this.contractConfigModel.ownerAddress});
            return  { isValidParticipant : result }
        }
        catch(error){
            return errorModel("RegistryService.isValidParticipant", null, error.message, error.stack);
        }
    }

    async addUser(originator, benefactor){
        try{
            let data = this.ethService.createTransctionDataObject('addParticipant', [originator, benefactor], this.contractConfigModel.abi);
            let txResult = await this.ethService.sendSignedTransaction(this.contractConfigModel, data, 0, addUserGasCost, gasPrice); 
            if(!txResult.success){
                throw txResult.error;
            }
            let pendingTransaction = this.transactionService.createPendingTransaction('RegistryService.addUser', { userToAdd: [originator, benefactor]}, txResult.txHash);
            return pendingTransaction;
        }
        catch(error){
            return errorModel("RegistryService.addUser", { originator: originator, benefactor: benefactor}, error.message, error.stack);
        }
    }

    async deleteUser(address){
        try{
            let data = this.ethService.createTransctionDataObject('removeParticipant', [address], this.contractConfigModel.abi);
            let txResult = await this.ethService.sendSignedTransaction(this.contractConfigModel, data, 0, addUserGasCost, gasPrice); 
            if(!txResult.success){
                throw txResult.error;
            }
            let pendingTransaction = this.transactionService.createPendingTransaction('RegistryService.deleteUser', { userToDelete: [address]}, txResult.txHash);
            return pendingTransaction;
        }
        catch(error){
            return errorModel("RegistryService.deleteUser", { address: address}, error.message, error.stack);
        }
    }

    async updateUser(originator, beneficiary){
        try{
            let data = this.ethService.createTransctionDataObject('updateParticpant', [originator, benefactor], this.contractConfigModel.abi);
            let txResult = await this.ethService.sendSignedTransaction(this.contractConfigModel, data, 0, addUserGasCost, gasPrice); 
            if(!txResult.success){
                throw txResult.error;
            }
            let pendingTransaction = this.transactionService.createPendingTransaction('RegistryService.updateParticpant', { usersToUpdate: [originator, benefactor]}, txResult.txHash);
            return pendingTransaction;
        }
        catch(error){
            return errorModel("RegistryService.updateParticpant", { originator: originator, benefactor: benefactor}, error.message, error.stack);
        }
    } 
}

module.exports = RegistryService;