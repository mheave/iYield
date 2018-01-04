const Eth = require('ethjs');
const sign = require('ethjs-signer').sign
const ConfigurationService = require('./ConfigurationService');
const BN = require('bn.js');

class EthService{
    constructor(){
        let configurationService = new ConfigurationService();
        let globalConfig = configurationService.getGlobalSettings();        
        this.eth = new Eth(new Eth.HttpProvider(globalConfig.ethNode));        

    }

    async sendSignedTransaction(contractModel, data, value, gasCost, gasPrice){
        let nonce = await this.getCurrentNonceForAccount(contractModel.ownerAddress);

        return await this.eth.sendRawTransaction(sign({
            to: contractModel.contractAddress,
            value: value,
            gas: new BN(gasCost),
            gasPrice: new BN(gasPrice),
            nonce: nonce,
            data: data
          }, contractModel.ownerPrivateKey))
    }

    async getCurrentNonceForAccount(account){
        let nonce = await this.eth.getTransactionCount(account);
        return nonce;
    }
}

module.exports = EthService;