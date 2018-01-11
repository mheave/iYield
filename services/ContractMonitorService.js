const TokenService = require('./TokenService');
const EthFilter = require('ethjs-filter');

class ContractMonitorService{
    constructor(){ }

    getIYPresaleTokenPurchasedEvent(){
        let tokenService = new TokenService();
        console.log("event subscription running");
        var contractEvent = tokenService.contract.CurrencyTokenPurchased([]);
        return contractEvent;
    }

    iYPresalePurchaseEventReceived(event){
        console.log("event received...");
        console.log(event);
    }
}

module.exports = ContractMonitorService;