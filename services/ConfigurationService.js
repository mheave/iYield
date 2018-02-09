const contractConfigModel = require('../models/contractConfigModel');
const ABI = require('../config/ABI.js');
const rinkebyUrl = 'https://rinkeby.infura.io';
const localHostUrl = 'http://127.0.0.1:8545';

class ConfigurationService {

  constructor(){

    this.ethNode = rinkebyUrl;
    this.ycAccountAddress = '0x1313734d2D6625173278978DDaa7B63400462745';
    this.ycAccountPrivateKey = '0x673a54beee87f667d9204d314433b04e49011d1a4caa74bf166830d6d7570515';

  };

  setGlobalSettings(params) {

    /*if (params.ethNode) {
      this.ethNode = params.ethNode;
    }

    if (params.ycAccountAddress) {
      this.ycAccountAddress = params.ycAccountAddress;
    }*/

    if (params.ycAccountPrivateKey) {
      this.ycAccountPrivateKey = params.ycAccountPrivateKey;
    }

  }

  getGlobalSettings(){
    return {
      ethNode: this.ethNode,
      ycAccountAddress: this.ycAccountAddress,
      ycAccountPrivateKey: this.ycAccountPrivateKey,
      blockCheckIntervalTime: 10000
    };
  }

  getLocalStorageSettings(){
    return{
      iYieldTransactionsKey: 'iYieldTransactions',
      pendingIYieldTransactionsKey: 'pending-iYieldTransactions'
    };
  }

  getMintableTokenContractConfig(){
    let contractAddress = '0x835c42aaf82e1c49367a4fa012a8f76c50f5caff';
    let globalSettings = this.getGlobalSettings();
    let ownerAddress = globalSettings.ycAccountAddress;
    let ownerPrivateKey = globalSettings.ycAccountPrivateKey;
    let abi = ABI.MintableCoinAbi;;
    return contractConfigModel(contractAddress, ownerAddress, ownerPrivateKey, abi);
  }

  getRegistryContractConfig() {
    let contractAddress = '0xaa148d4490a4d6b83c7c26ad16f31dda21c3895a';
    let globalSettings = this.getGlobalSettings();
    let ownerAddress = globalSettings.ycAccountAddress;
    let ownerPrivateKey = globalSettings.ycAccountPrivateKey;
    return contractConfigModel(contractAddress, ownerAddress, ownerPrivateKey, ABI.RegistryAbi);
  }

  getIyPresaleContractConfig(){
    let contractAddress = '0xd6d387590973f6da8e264d7ab519efaa7e1f5520';
    let globalSettings = this.getGlobalSettings();
    let ownerAddress = globalSettings.ycAccountAddress;
    let ownerPrivateKey = globalSettings.ycAccountPrivateKey;
    return contractConfigModel(contractAddress, ownerAddress, ownerPrivateKey, ABI.IYPresaleAbi);
  }
}

module.exports = ConfigurationService;