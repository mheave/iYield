//var config = require('../config');
const Eth = require('ethjs');
const ethAbi = require('ethjs-abi');
const _ = require('lodash')
const sign = require('ethjs-signer').sign
const BN = require('bignumber.js')

class TransactionService {
    constructor(httpUrl, abi, contractAddress, ownerAddress, privateKey){  
        // set default in function or var or file... 
        this.abi = abi;
        this.contractAddress = contractAddress;
        this.ownerAddress = ownerAddress;
        this.privateKey = privateKey;
        this.eth = new Eth(new Eth.HttpProvider(httpUrl));
        this.contract = new this.eth.contract(this.abi).at(this.contractAddress);
    }

    async buyTokens(beneficiary, callback){
        let abiMethod = this.getAbiMethodFromAbiName('buyTokens');
        let data = ethAbi.encodeMethod(abiMethod, [beneficiary]);

        await this.executeSignedTransaction(abiMethod, data, function(result){
            console.log("signed transaction executed")
            callback(result);
        });
    }    

    getAbiMethodFromAbiName(methodName){
        let abiMethod = _.find(this.contract.abi, function(item) { return item.name == methodName});
        return abiMethod;
    }

    getEncodedData(abiMethod, parameters){
        let data = ethAbi.encodeMethod(abiMethod, parameters);
        return data;
    }

    async executeSignedTransaction(abiMethod, data, callback){
        let gas = new BN('4712388');
        let gasPrice = new BN('100000000000 ');
        let nonce = await this.eth.getTransactionCount(this.ownerAddress)        
        await this.eth.sendRawTransaction(sign({
            from: this.ownerAddress,
            to: this.contractAddress,
            value: 500,
            gas: gas,
            // when sending a raw transactions it's necessary to set the gas price, currently 0.00000002 ETH
            gasPrice: gasPrice,
            nonce: nonce,
            data: data
          }, this.privateKey), function(reponse){
              callback(reponse);
          });        
    }

    async getTotalMigrated(callback){
        let abiMethod = this.getAbiMethodFromAbiName('weiRaised');
        let data = ethAbi.encodeMethod(abiMethod, []);

        await this.executeSignedTransaction(abiMethod, data, function(result){
            console.log("getTotalMigrated signed transaction executed")
            callback(result);
        });
        
    }
}

module.exports = TransactionService;




// async issueCoins(contractId, callback){
    
//             let currentNonce = await this.nonceService.getCurrentNonceForContract(contractId, function (nonce) {
//                 callback(nonce);
//             });
//             return currentNonce;
    
//         }