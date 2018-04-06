const format = require('ethjs-format');
const unit = require('ethjs-unit');
const BN = require('bn.js');

const ConfigurationService = require('./ConfigurationService');
const EthService = require('./EthService');
const TransactionService = require('./TransactionService');
const RegistryService = require('./RegistryService');

const pendingTransactionModel = require('../models/blockchain/PendingTransactionModel');
const errorModel = require('../models/ErrorModel');

const buyTokensGasCost = 1000000;
const gasPrice = 20000000000;

class TokenService {
    constructor(privateKey){  
        this.transactionService = new TransactionService();   
        this.ethService = new EthService();     

        let configurationService = new ConfigurationService(privateKey);             
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

            let pendingTransaction = this.transactionService.createPendingTransaction('TokenService.currencyTokenPurchase', { beneficiary: beneficiary, currency: currency, currencyAmount: currencyAmount, tokenAmount: tokenAmount}, txResult.txHash);
            return pendingTransaction;            
        }
        catch(error){
            return errorModel("TokenService.currencyTokenPurchase", {beneficiary: beneficiary, currency: currency, currencyAmount: currencyAmount, tokenAmount: tokenAmount }, error.message, error.stack);
        }
    }
   
    async migrateTokens(){
        try{
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
                this.transactionService.createPendingTransaction('TokenService.migrateAccount', { beneficiary: beneficiaryAddress}, txResult.txHash);         
            }
            return { totalAccountsMigrated: migrationResult.length, report: migrationResult};

        }
        catch(error){
            return errorModel("TokenService.migrateTokens",null, error.message, error.stack);
        }
    }

    async getCurrentRaisedFrtAmount(){
        try{
            let mintableContract = await this.ethService.getContractFromConfig(this.mintableContractConfig);
                        
            let formattedPayload = format.formatInputs('eth_call',
            [{
                "from" : this.mintableContractConfig.ownerAddress,
                "to" : this.mintableContractConfig.contractAddress,
                "data" : "0x"
            }, "latest"]);

            let result = await mintableContract.totalSupply.call(formattedPayload);
            let totalRaisedInWei = result[0].toString(10);
            // this conversion is a bit of a misnomer; it's actually tokens not ether.
            let totalRaised = unit.fromWei(totalRaisedInWei, 'ether')
            return  { currentContractFrtTotal : totalRaised }
        }
        catch(error){
            return errorModel("TokenService.getCurrentRaisedAmount", null, error.message, error.stack);
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
            return errorModel("TokenService.getTokenBalanceForAddress", {address: address}, error.message, error.stack);
        }
    }

    async getYcBalanceForAddress(address){
        try{
            let iyPresaleContract = await this.ethService.getContractFromConfig(this.ycContractConfig);
            let balanceResult = await iyPresaleContract.balanceOf(address);
            console.log(balanceResult);
            let balance = unit.fromWei(balanceResult.balance.toString(10), 'ether');
            return { balance: balance };
        }
        catch(error){
            return errorModel("TokenService.getYcBalanceForAddress",{address: address}, error.message, error.stack);
        }
    }        
}

module.exports = TokenService;
