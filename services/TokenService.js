const ConfigurationService = require('./ConfigurationService');
const EthService = require('./EthService')

const buyTokensGasCost = 200000;
const gasPrice = 20000000000;

class TokenService {
    constructor(){  
        let configurationService = new ConfigurationService();
        this.contractConfigModel = configurationService.getIyPresaleContractConfig();
        this.ethService = new EthService();     
        this.contract = new this.ethService.eth.contract(this.contractConfigModel.abi).at(this.contractConfigModel.contractAddress);   
    }

    async buyTokens(beneficiary){
        try{
            let data = this.ethService.createTransctionDataObject('buyTokens', [beneficiary], this.contractConfigModel.abi);
            return await this.ethService.sendSignedTransaction(this.contractConfigModel, data, 10, buyTokensGasCost, gasPrice);
        }
        catch(error){
            return { buyTokenError: error};
        }

    }    
}

module.exports = TokenService;
