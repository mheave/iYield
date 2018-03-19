const ConfigurationService = require('./ConfigurationService');
const EthService = require('./EthService');
const TransactionService = require('./TransactionService');
const NonceService = require('./NonceService');
const RegistryService = require('./RegistryService');
const iYieldTransactionModel = require('../models/blockchain/iYieldTransactionModel');
const unit = require('ethjs-unit');
const errorModel = require('../models/errorModel');


const buyTokensGasCost = 1000000;
const gasPrice = 20000000000;

class TokenService {
    constructor(){  
        this.transactionService = new TransactionService();   
        this.nonceService = new NonceService();     
        let configurationService = new ConfigurationService();
        this.ethService = new EthService();             
        this.contractConfigModel = configurationService.getIyPresaleContractConfig();
        this.mintableContractConfig = configurationService.getMintableTokenContractConfig();
    }

   
    async currencyTokenPurchase(beneficiary, currency, currencyAmount, tokenAmount){
        try{
            let tokenAmountInWei = unit.toWei(tokenAmount, 'ether');
            let data = this.ethService.createTransctionDataObject('currencyTokenPurchase', [beneficiary, currency, currencyAmount, tokenAmountInWei], this.contractConfigModel.abi)
            let txResult = await this.sendTokenServiceTransaction(data, buyTokensGasCost, gasPrice);   
            if(!txResult.success){
                throw txResult.error;
            }
            let iYieldTransaction = iYieldTransactionModel('currencyTokenPurchase', { beneficiary: beneficiary, currency: currency, currencyAmount: currencyAmount, tokenAmount: tokenAmount}, txResult.txHash);
            this.transactionService.addTransactionToPendingList(iYieldTransaction);
            return iYieldTransaction;            
        }
        catch(error){
            return errorModel("TokenService.currencyTokenPurchase", error, {beneficiary: beneficiary, currency: currency, currencyAmount: currencyAmount, tokenAmount: tokenAmount });
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

    async migrateTokens(){
        let registryService = new RegistryService();
        let beneficiaries = await registryService.getAllBeneficiaries();
        if(beneficiaries.length === 0){
            return;
        }

        let migrationResult = [];
        for(let b = 0; b < beneficiaries.length; b++){
            var beneficiaryAddress = beneficiaries[b];
            console.log("Migrate account: " + beneficiaryAddress);
            let data = this.ethService.createTransctionDataObject('migrateAccount', [beneficiaryAddress], this.contractConfigModel.abi)
            let txResult = await this.sendTokenServiceTransaction(data, buyTokensGasCost*2, gasPrice);   
            migrationResult.push({ beneficiary: beneficiaryAddress, txResult: txResult});
            console.log(txResult);
        }

        return { report: migrationResult, accountsProcessed: 88, totalTokensMinted: 500};
    }


    async sendTokenServiceTransaction(data, gasCost, gasPrice){
        let txNonce = this.nonceService.getNextAvailableNonceForAddress(this.contractConfigModel.ownerAddress);
        this.nonceService.setLastSentTransactionNonceForAddress(this.contractConfigModel.ownerAddress, txNonce);
        let txResult =  await this.ethService.sendSignedTransaction(txNonce, this.contractConfigModel, data, 0, gasCost, gasPrice);   
        return txResult;
    }


}

module.exports = TokenService;
