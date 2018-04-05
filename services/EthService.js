const Eth = require('ethjs');
const ethAbi = require('ethjs-abi');
const sign = require('ethjs-signer').sign;
const BN = require('bn.js');
const _ = require('lodash');

const ConfigurationService = require('./ConfigurationService');

const TransactionResult = require('../models/blockchain/TransactionResult');

class EthService{
    constructor(){
        let configurationService = new ConfigurationService();
        let globalConfig = configurationService.getGlobalSettings();        
        this.eth = new Eth(new Eth.HttpProvider(globalConfig.ethNode));        
    }

    async getContractFromConfig(contractConfigModel){
        let contract = await this.eth.contract(contractConfigModel.abi).at(contractConfigModel.contractAddress); 
        return contract;
    }

    async getTransactionStatusFromNetwork(txHash){
        let txStatus = await this.eth.getTransactionByHash(txHash);
        return txStatus;
    }

    async getTransactionReceiptFromNetwork(txHash){
        let txReceipt = await this.eth.getTransactionReceipt(txHash);
        return txReceipt;
    }

    async sendSignedTransaction(contractModel, data, value, gasCost, gasPrice){
        if(contractModel.ownerPrivateKey === ""){
            return { error: { message: "private key not available for transaction."}};
        }

        let nonce = await this.getCurrentNonceForAccount(contractModel.ownerAddress);
        let signedTransaction = sign({
            to: contractModel.contractAddress,
            value: value,
            gas: new BN(gasCost),
            gasPrice: new BN(gasPrice),
            nonce: nonce,
            data: data
          }, contractModel.ownerPrivateKey);

        return await this.sendRawSignedTransction(signedTransaction);
    }

    async sendRawSignedTransction(signedTransaction){
        let transaction = await this.eth.sendRawTransaction(signedTransaction).catch((err) => {return err;});
        let txResult = TransactionResult(transaction);
        return txResult;        
    }

    async getCurrentNonceForAccount(account){
        let nonce = await this.eth.getTransactionCount(account, 'pending');
        return nonce;
    }

    createTransctionDataObject(methodName, data, contractAbi){
        let abiMethod = this.getMethodFromAbi(methodName, contractAbi);
        if(abiMethod === undefined){
            throw new Error("ABI method undefined");
        }
        let dataObject = ethAbi.encodeMethod(abiMethod, data)
        return dataObject;
    }

    getMethodFromAbi(methodName, abi){
        let abiMethod = _.find(abi, function(item) { return item.name == methodName})
        return abiMethod;
    }    
}

module.exports = EthService;