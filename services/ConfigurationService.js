const contractModel = require('../models/contractModel');

class ConfigurationService {
  constructor(){};

  getGlobalSettings(){
    return {
      ethNode: 'http://127.0.0.1:8545',
      ycAccountAddress: '0x108922690fd89d478c5eefac856c537112d140d2',
      ycAccountPrivateKey: '0xcbabe2f6a2ab3926b006547306b890c897e3a39ae4b01924503a09e880f1d77a'
    };
  }

  getRegistryContractConfig() {
    let contractAddress = '0x075f9795a5427f1ee23e8453cce7a0a7e4667950';
    let globalSettings = this.getGlobalSettings();
    let ownerAddress = globalSettings.ycAccountAddress;
    let ownerPrivateKey = globalSettings.ycAccountPrivateKey;
    return contractModel( contractAddress, 
                          ownerAddress,
                          ownerPrivateKey,
                          [{"constant":false,"inputs":[{"name":"_originator","type":"address"},{"name":"_beneficiary","type":"address"}],"name":"updateParticpant","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAllBeneficiaries","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_account","type":"address"}],"name":"getBeneficiary","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_originator","type":"address"}],"name":"removeParticipant","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_originator","type":"address"}],"name":"isValidParticipant","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_originator","type":"address"},{"name":"_beneficiary","type":"address"}],"name":"addParticipant","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"Register","outputs":[{"name":"beneficiary","type":"address"},{"name":"index","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"originator","type":"address"},{"indexed":true,"name":"beneficiary","type":"address"}],"name":"ParticipantAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"originator","type":"address"},{"indexed":true,"name":"beneficiary","type":"address"}],"name":"ParticipantUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"originator","type":"address"}],"name":"ParticipantRemoved","type":"event"}]  
                        );
  }

  getIyPresaleContractConfig(){
    let contractAddress = '0x10c78edd18badb17606631bf71a269505520ccf8';
    let globalSettings = this.getGlobalSettings();
    let ownerAddress = globalSettings.ycAccountAddress;
    let ownerPrivateKey = globalSettings.ycAccountPrivateKey;

    return contractModel( contractAddress, 
                          ownerAddress,
                          ownerPrivateKey,
                          [{"constant":true,"inputs":[],"name":"rate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"endTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"currencies","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"weiRaised","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"isCrowdsale","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"wallet","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"startTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"crowdsaleTitle","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"currencyRaised","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_beneficiary","type":"address"},{"name":"_currency","type":"bytes32"},{"name":"_currencyAmount","type":"uint256"},{"name":"_tokenAmount","type":"uint256"}],"name":"currencyTokenPurchase","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_currency","type":"bytes32"},{"name":"_decimals","type":"uint256"}],"name":"amendCurrencies","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_account","type":"address"}],"name":"buyTokens","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"hasEnded","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_beneficiary","type":"address"},{"name":"_currency","type":"bytes32"},{"name":"_currencyAmount","type":"uint256"},{"name":"_tokenAmount","type":"uint256"}],"name":"currencyTokenRefund","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"},{"indexed":false,"name":"currency","type":"bytes32"},{"indexed":false,"name":"currencyAmount","type":"uint256"},{"indexed":false,"name":"tokenAmount","type":"uint256"}],"name":"CurrencyTokenPurchased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"},{"indexed":false,"name":"currency","type":"bytes32"},{"indexed":false,"name":"currencyAmount","type":"uint256"},{"indexed":false,"name":"tokenAmount","type":"uint256"}],"name":"CurrencyTokenRefund","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"currency","type":"bytes32"},{"indexed":false,"name":"decimals","type":"uint256"}],"name":"AmendedCurrencies","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"purchaser","type":"address"},{"indexed":true,"name":"beneficiary","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"TokenPurchase","type":"event"}]
                        );
  }
  
}

module.exports = ConfigurationService;