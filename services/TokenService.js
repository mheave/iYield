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
            let transactionResult =  await this.ethService.sendSignedTransaction(this.contractConfigModel, data, 0, buyTokensGasCost, gasPrice);
            if(!transactionResult.success){
                throw transactionResult.error;
            }
            let iYieldTransaction = iYieldTransactionModel('currencyTokenPurchase', { beneficiary: beneficiary, currency: currency, currencyAmount: currencyAmount, tokenAmount: tokenAmount}, transactionResult.txHash);
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
        console.log("beneficiaries found");

        if(beneficiaries.length === 0){
            return;
        }

        let migrationResult = [];

        for(let b = 0; b < beneficiaries.length; b++){
            var beneficiaryAddress = beneficiaries[b];
            console.log("Migrate account: " + beneficiaryAddress);
            let txNonce = this.nonceService.getNextAvailableNonceForAddress(this.contractConfigModel.contractAddress);
            let data = this.ethService.createTransctionDataObject('migrateAccount', [beneficiaryAddress], this.contractConfigModel.abi)
            this.nonceService.setLastSentTransactionNonceForAddress(beneficiaryAddress, txNonce);
            let transactionResult =  await this.ethService.sendSignedTransaction(txNonce, this.contractConfigModel, data, 0, buyTokensGasCost*2, gasPrice);   
            migrationResult.push({ beneficiary: beneficiaryAddress, txResult: transactionResult});
            console.log(transactionResult);
        }

        return { report: migrationResult, accountsProcessed: 88, totalTokensMinted: 500};
    }

}

module.exports = TokenService;
