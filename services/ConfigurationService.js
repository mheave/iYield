const contractConfigModel = require('../models/ContractConfigModel');
const ABI = require('../config/ABI.js');
const rinkebyUrl = 'https://rinkeby.infura.io';
const localHostUrl = 'http://127.0.0.1:8545';

const accountAddress = "0x1313734d2D6625173278978DDaa7B63400462745";
var accountPrivateKey = "";

const registryContractAddress = "0x0BbDfFFA5b03422491b11b2b72B0b2Cf28045bC7";
const iyPresaleContractAddress = "0x1F95D4129AD4f88f0ac441B884507834e63d985d";
const mintableTokenContractAddress = "0xd1DF5bEa6d190A5B591B989A06c23e97AD7a5faa ";
const ycContractAddress = "0x80cA6050d18D55A88287E228288Ea649C64F7101 ";


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