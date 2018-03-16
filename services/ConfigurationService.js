const contractConfigModel = require('../models/contractConfigModel');
const ABI = require('../config/ABI.js');
const rinkebyUrl = 'https://rinkeby.infura.io';
const localHostUrl = 'http://127.0.0.1:8545';
const registryContractAddress = "0xaa148d4490a4d6b83c7c26ad16f31dda21c3895a";
const iyPresaleContractAddress = "0xd6d387590973f6da8e264d7ab519efaa7e1f5520";
const mintableTokenContractAddress = "0x835c42aaf82e1c49367a4fa012a8f76c50f5caff";


class ConfigurationService {
  constructor(){};

  getGlobalSettings(){
    return {
      ethNode: rinkebyUrl,
      ycAccountAddress: '0x1313734d2D6625173278978DDaa7B63400462745',
      ycAccountPrivateKey: '0x673a54beee87f667d9204d314433b04e49011d1a4caa74bf166830d6d7570515',
      blockCheckIntervalTime: 10000
    };
  }

  getLocalStorageSettings(){
    return{
      iYieldTransactionsKey: 'iYieldTransactions',
      pendingIYieldTransactionsKey: 'pending-iYieldTransactions',
      registryContractAddress: registryContractAddress, 
      mintableTokenContractAddress: mintableTokenContractAddress,
      iyPresaleContractAddress: iyPresaleContractAddress
    };
  }

  getRegistryContractConfig() {
    let contractAddress = registryContractAddress;
    let globalSettings = this.getGlobalSettings();
    let ownerAddress = globalSettings.ycAccountAddress;
    let ownerPrivateKey = globalSettings.ycAccountPrivateKey;
    return contractConfigModel(contractAddress, ownerAddress, ownerPrivateKey, ABI.RegistryAbi);
  }

  getIyPresaleContractConfig(){
    let contractAddress = iyPresaleContractAddress;
    let globalSettings = this.getGlobalSettings();
    let ownerAddress = globalSettings.ycAccountAddress;
    let ownerPrivateKey = globalSettings.ycAccountPrivateKey;
    return contractConfigModel(contractAddress, ownerAddress, ownerPrivateKey, ABI.IYPresaleAbi);
  }

  getMintableTokenContractConfig(){
    let contractAddress = mintableTokenContractAddress;
    let globalSettings = this.getGlobalSettings();
    let ownerAddress = globalSettings.ycAccountAddress;
    let ownerPrivateKey = globalSettings.ycAccountPrivateKey;
    let abi = ABI.MintableCoinAbi;;
    return contractConfigModel(contractAddress, ownerAddress, ownerPrivateKey, abi);
  }  
}

module.exports = ConfigurationService;