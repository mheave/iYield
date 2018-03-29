const contractConfigModel = require('../models/ContractConfigModel');
const ABI = require('../config/ABI.js');
const rinkebyUrl = 'https://rinkeby.infura.io';
const localHostUrl = 'http://127.0.0.1:8545';

const accountAddress = "0x1313734d2D6625173278978DDaa7B63400462745";
var accountPrivateKey = "";

const registryContractAddress = "0x0BbDfFFA5b03422491b11b2b72B0b2Cf28045bC7";
const iyPresaleContractAddress = "0xF1Fd25AD70f23bfF25a009De91ea6e8FEacd6D13";
const mintableTokenContractAddress = "0xB8cEF33192ddbE8A0DA9b93ABCFd0900dd8e765D";
const ycContractAddress = "0x653C17F265eAeC784B591698F95E9Fe3D6aDe183  ";


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