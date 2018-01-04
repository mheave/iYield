//https://github.com/ConsenSys/eth-signer
//https://web3js.readthedocs.io/en/1.0/web3-eth-abi.html#encodefunctioncall
//https://github.com/ethjs/ethjs-abi/blob/e63f92966179d9017b57c9eadef78384a6899a51/src/index.js#L113
const Eth = require('ethjs');
const ethAbi = require('ethjs-abi');
const _ = require('lodash');
const sign = require('ethjs-signer').sign;
const BN = require('bn.js');
const ConfigurationService = require('./ConfigurationService');
const EthService = require('./EthService')


// Gas
// refactor this out into a service to allow configuration of gas
const gasPrice = 20000000000;
const addUserGasCost = 4712388;
const deleteUserGasCost = 4712388;
const updateUserGatCost = 4712388;

// Need to unlock main account on node for this to work
//web3.personal.unlockAccount("0x1313734d2D6625173278978DDaa7B63400462745", '', 9999999);
class RegistryService{
    constructor(){
        let configurationService = new ConfigurationService();
        this.contractModel = configurationService.getRegistryContractConfig();
        this.ethService = new EthService();     
        this.contract = new this.ethService.eth.contract(this.contractModel.abi).at(this.contractAddress);
    }

    async getUsers(){
        let result = await this.contract.getAllBeneficiaries({from: this.ownerAddress})
        // only accounts for positive case
        return {registered: result[0]}
    }

    async getUser(address){
        return await this.contract.getBeneficiary(address, {from: this.ownerAddress});
    }

    async addUser(originator, benefactor){
        let data = this.createTransctionDataObject('addParticipant', [originator, benefactor]);
        return await this.ethService.sendSignedTransaction(this.contractModel, data, 0, addUserGasCost, gasPrice);
    }

    async deleteUser(address){
        let data = this.createTransctionDataObject('removeParticipant', [address]);
        return await this.ethService.sendSignedTransaction(this.contractModel, data, 0, deleteUserGasCost, gasPrice);
    }

    async updateUser(originator, beneficiary){
        let data = this.createTransctionDataObject('updateParticpant', [originator, beneficiary]);
        return await this.ethService.sendSignedTransaction(this.contractModel, data, 0, updateUserGatCost, gasPrice);
    }

    createTransctionDataObject(methodName, data){
        let abiMethod = this.getMethodFromAbi(methodName);
        let dataObject = ethAbi.encodeMethod(abiMethod, data)
        return dataObject;
    }

    getMethodFromAbi(methodName){
        let abiMethod = _.find(this.contract.abi, function(item) { return item.name == methodName})
        return abiMethod;
    }
}

module.exports = RegistryService;