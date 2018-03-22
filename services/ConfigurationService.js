const contractConfigModel = require('../models/ContractConfigModel');
const ABI = require('../config/ABI.js');
const rinkebyUrl = 'https://rinkeby.infura.io';
const localHostUrl = 'http://127.0.0.1:8545';

const accountAddress = "0x1313734d2D6625173278978DDaa7B63400462745";
var accountPrivateKey = "";

const registryContractAddress = "0xfba4ae7d29fdc97ede7fb8f47e7d303aa22a3f1f";
const iyPresaleContractAddress = "0x704b8ffd334d7678901f8ce080899a004d17fa92";
const mintableTokenContractAddress = "0xD7A456279a0AbC79AeB3d8D9f6a1F7C88eA7D3c0";
const ycContractAddress = "0xd7a456279a0abc79aeb3d8d9f6a1f7c88ea7d3c0";


class ConfigurationService {

  constructor(privateKey){
    this.ethNode = rinkebyUrl;
    this.ycAccountAddress = accountAddress;
    this.ycAccountPrivateKey = (privateKey) ? privateKey : "";
  };

  getGlobalSettings(){
    return {
      ethNode: this.ethNode,
      ycAccountAddress: this.ycAccountAddress,
      ycAccountPrivateKey: this.ycAccountPrivateKey,
      blockCheckIntervalTime: 5000
    };
  }

  getLocalStorageSettings(){
    let contractsArray = this.getArrayOfCurrentContracts();
    return{
      spentTransactionsKey: 'iYieldTransactions',
      pendingTransactionsKey: 'pending-iYieldTransactions',
      currentContractsSettings: contractsArray
    };
  }

  getArrayOfCurrentContracts(){
    let registryContract = this.getRegistryContractConfig();
    let iyPresaleContract = this.getIyPresaleContractConfig();
    let mintableTokenContract = this.getMintableTokenContractConfig();
    let contractArray = [registryContract, iyPresaleContract, mintableTokenContract];
    return contractArray;
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

  getMintableTokenContractConfig(){
    let contractAddress = mintableTokenContractAddress;
    let globalSettings = this.getGlobalSettings();
    let ownerAddress = globalSettings.ycAccountAddress;
    let ownerPrivateKey = globalSettings.ycAccountPrivateKey;
    let abi = ABI.MintableCoinAbi;;
    return contractConfigModel(contractAddress, ownerAddress, ownerPrivateKey, abi);
  }    

  getYCTokenContractConfig(){
    let contractAddress = ycContractAddress;
    let globalSettings = this.getGlobalSettings();
    let ownerAddress = globalSettings.ycAccountAddress;
    let ownerPrivateKey = globalSettings.ycAccountPrivateKey;
    let abi = ABI.MintableCoinAbi;;
    return contractConfigModel(contractAddress, ownerAddress, ownerPrivateKey, abi);    
  }
}

module.exports = ConfigurationService;