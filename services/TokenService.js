const unit = require('ethjs-unit');

const ConfigurationService = require('./ConfigurationService');
const EthService = require('./EthService');
const TransactionService = require('./TransactionService');
const RegistryService = require('./RegistryService');

const pendingTransactionModel = require('../models/blockchain/PendingTransactionModel');
const errorModel = require('../models/ErrorModel');

const buyTokensGasCost = 1000000;
const gasPrice = 20000000000;

class TokenService {
    constructor(){  
        this.transactionService = new TransactionService();   
        this.ethService = new EthService();     

        let configurationService = new ConfigurationService();             
        this.contractConfigModel = configurationService.getIyPresaleContractConfig();
        this.mintableContractConfig = configurationService.getMintableTokenContractConfig();
        this.ycContractConfig = configurationService.getYCTokenContractConfig();
    }
  
    async currencyTokenPurchase(beneficiary, currency, currencyAmount, tokenAmount){
        try{
            let tokenAmountInWei = unit.toWei(tokenAmount, 'ether');
            let data = this.ethService.createTransctionDataObject('currencyTokenPurchase', [beneficiary, currency, currencyAmount, tokenAmountInWei], this.contractConfigModel.abi)
            let txResult = await this.ethService.sendSignedTransaction(this.contractConfigModel, data, 0, buyTokensGasCost, gasPrice); 
            if(!txResult.success){
                throw txResult.error;
            }
            let pendingTransaction = pendingTransactionModel('TokenService.currencyTokenPurchase', { beneficiary: beneficiary, currency: currency, currencyAmount: currencyAmount, tokenAmount: tokenAmount}, txResult.txHash);
            this.transactionService.addTransactionToPendingList(pendingTransaction);
            return pendingTransaction;            
        }
        catch(error){
            return errorModel("TokenService.currencyTokenPurchase", {beneficiary: beneficiary, currency: currency, currencyAmount: currencyAmount, tokenAmount: tokenAmount }, error.message, error.stack);
        }
    }

    async getTokenBalanceForAddress(address){
        try{
            let mintableContract = await this.ethService.getContractFromConfig(this.mintableContractConfig);
            let balanceResult = await mintableContract.balanceOf(address);
            let balance = unit.fromWei(balanceResult.balance.toString(10), 'ether');
            return { balance: balance };
        }
        catch(error){
            return errorModel("TokenService.getTokenBalanceForAddress", error, {address: address});
        }
    }

    async getYcBalanceForAddress(address){
        try{
            let iyPresaleContract = await this.ethService.getContractFromConfig(this.ycContractConfig);
            let balanceResult = await iyPresaleContract.balanceOf(address);
            let balance = unit.fromWei(balanceResult.balance.toString(10), 'ether');
            return { balance: balance };
        }
        catch(error){
            return errorModel("TokenService.getYcBalanceForAddress",{address: address}, error.message, error.stack);
        }
    }    

    async migrateTokens(){
        let registryService = new RegistryService();
        let beneficiaries = await registryService.getAllBeneficiaries();
        if(beneficiaries.length === 0){
            return;
        }

        let migrationResult = [];
        for(let b = 0; b < beneficiaries.length; b++){
            var beneficiaryAddress = beneficiaries[b];
            let data = this.ethService.createTransctionDataObject('migrateAccount', [beneficiaryAddress], this.contractConfigModel.abi)
            let txResult = await this.ethService.sendSignedTransaction(this.contractConfigModel, data, 0, buyTokensGasCost, gasPrice); 
            
            migrationResult.push({ beneficiary: beneficiaryAddress, txResult: txResult});
            let pendingTransaction = pendingTransactionModel('TokenService.migrateAccount', { beneficiary: beneficiaryAddress}, txResult.txHash);
            this.transactionService.addTransactionToPendingList(pendingTransaction);            
        }
        return { totalAccountsMigrated: migrationResult.length, report: migrationResult};
    }
}

module.exports = TokenService;
