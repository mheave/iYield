const ConfigurationService = require('./ConfigurationService');
const EthService = require('./EthService');
const TransactionService = require('./TransactionService');
const iYieldTransactionModel = require('../models/blockchain/iYieldTransactionModel');
const unit = require('ethjs-unit');

const buyTokensGasCost = 1000000;
const gasPrice = 20000000000;

class TokenService {
    constructor(){  
        this.transactionService = new TransactionService();        
        let configurationService = new ConfigurationService();
        this.contractConfigModel = configurationService.getIyPresaleContractConfig();
        this.mintableContractConfig = configurationService.getMintableTokenContractConfig();
        this.ethService = new EthService();     
    }

   
    async currencyTokenPurchase(beneficiary, currency, currencyAmount, tokenAmount){
        try{
            let tokenAmountInWei = unit.toWei(tokenAmount, 'ether');
            let data = this.ethService.createTransctionDataObject('currencyTokenPurchase', [beneficiary, currency, currencyAmount, tokenAmountInWei], this.contractConfigModel.abi)
            let transactionHash =  await this.ethService.sendSignedTransaction(this.contractConfigModel, data, 0, buyTokensGasCost, gasPrice);
            let iYieldTransaction = iYieldTransactionModel('currencyTokenPurchase', { beneficiary: beneficiary, currency: currency, currencyAmount: currencyAmount, tokenAmount: tokenAmount}, transactionHash);
            this.transactionService.addTransactionToPendingList(iYieldTransaction);
            return iYieldTransaction;            
        }
        catch(error){
            return { currencyTokenPurchaseError: error };
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
            return { getTokenBalanceForAddressError: error};
        }
    }

    async adminPermittedToPurchase(){
        try{
            let data = this.ethService.createTransctionDataObject('validPurchase', [], this.contractConfigModel.abi);
            return await this.ethService.sendSignedTransaction(this.contractConfigModel, data, 0, buyTokensGasCost, gasPrice);
        }
        catch(error){
            return { adminPermittedToPurchaseError: error };
        }
    }
}

module.exports = TokenService;
