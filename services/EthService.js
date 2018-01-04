const Eth = require('ethjs');
const ethAbi = require('ethjs-abi');
const sign = require('ethjs-signer').sign
const ConfigurationService = require('./ConfigurationService');
const BN = require('bn.js');
const _ = require('lodash');

class EthService{
    constructor(){
        let configurationService = new ConfigurationService();
        let globalConfig = configurationService.getGlobalSettings();        
        this.eth = new Eth(new Eth.HttpProvider(globalConfig.ethNode));        

    }

    async sendSignedTransaction(contractConfigModel, data, value, gasCost, gasPrice){
        let nonce = await this.getCurrentNonceForAccount(contractConfigModel.ownerAddress);

        return await this.eth.sendRawTransaction(sign({
            to: contractConfigModel.contractAddress,
            from: contractConfigModel.ownerAddress,
            value: value,
            gas: new BN(gasCost),
            gasPrice: new BN(gasPrice),
            nonce: nonce,
            data: data
          }, contractConfigModel.ownerPrivateKey))
    }

    async getCurrentNonceForAccount(account){
        let nonce = await this.eth.getTransactionCount(account);
        return nonce;
    }

    createTransctionDataObject(methodName, data, contractAbi){
        let abiMethod = this.getMethodFromAbi(methodName, contractAbi);
        let dataObject = ethAbi.encodeMethod(abiMethod, data)
        return dataObject;
    }

    getMethodFromAbi(methodName, abi){
        let abiMethod = _.find(abi, function(item) { return item.name == methodName})
        return abiMethod;
    }    
}

module.exports = EthService;