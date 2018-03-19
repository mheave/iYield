//https://github.com/ConsenSys/eth-signer
//https://web3js.readthedocs.io/en/1.0/web3-eth-abi.html#encodefunctioncall
//https://github.com/ethjs/ethjs-abi/blob/e63f92966179d9017b57c9eadef78384a6899a51/src/index.js#L113
const ConfigurationService = require('./ConfigurationService');
const EthService = require('./EthService');
const TransactionService = require('./TransactionService');
const NonceService = require('./NonceService');
const iYieldTransactionModel = require('../models/blockchain/iYieldTransactionModel');
const errorModel = require('../models/errorModel');


// Gas
// refactor this out into a service to allow configuration of gas
const gasPrice = 20000000000;
const addUserGasCost = 4712388;
const deleteUserGasCost = 4712388;
const updateUserGasCost = 4712388;

// Need to unlock main account on node for this to work
//web3.personal.unlockAccount("0x1313734d2D6625173278978DDaa7B63400462745", '', 9999999);
class RegistryService{
    constructor(){
        this.transactionService = new TransactionService();
        this.nonceService = new NonceService();
        let configurationService = new ConfigurationService();        
        this.contractConfigModel = configurationService.getRegistryContractConfig();
        this.ethService = new EthService();     
        this.contract = new this.ethService.eth.contract(this.contractConfigModel.abi).at(this.contractConfigModel.contractAddress);
    }

    async getAllBeneficiaries(){
        let result = await this.contract.getAllBeneficiaries({from: this.ownerAddress})
        if(result[0].length && result[0].length > 0){
            return result[0];
        }
        return [];
    }

    async getUser(address){
        return await this.contract.getBeneficiary(address, {from: this.ownerAddress});
    }

    async addUser(originator, benefactor){
        try{
            let data = this.ethService.createTransctionDataObject('addParticipant', [originator, benefactor], this.contractConfigModel.abi);
            let txResult = await this.sendRegistryServiceTransaction(data, addUserGasCost, gasPrice);
            if(!txResult.success){
                throw txResult.error;
            }
            let iYieldTransaction = iYieldTransactionModel('addUser', { userToAdd: [originator, benefactor]}, txResult.txHash);
            this.transactionService.addTransactionToPendingList(iYieldTransaction);
            return iYieldTransaction;
        }
        catch(error){
            return errorModel("RegistryService.addUser", error, { originator: originator, benefactor: benefactor});
        }
    }

    async deleteUser(address){
        let data = this.ethService.createTransctionDataObject('removeParticipant', [address], this.contractConfigModel.abi);
        let txResult = await this.sendRegistryServiceTransaction(data, deleteUserGasCost, gasPrice);
        return txResult;
    }

    async updateUser(originator, beneficiary){
        let data = this.ethService.createTransctionDataObject('updateParticpant', [originator, beneficiary], this.contractConfigModel.abi);
        let txResult = await this.sendRegistryServiceTransaction(data, updateUserGasCost, gasPrice);
        return txResult;
    }

    async sendRegistryServiceTransaction(data, gasCost, gasPrice){
        let txNonce = this.nonceService.getNextAvailableNonceForAddress(this.contractConfigModel.ownerAddress);
        this.nonceService.setLastSentTransactionNonceForAddress(this.contractConfigModel.ownerAddress, txNonce);
        let txResult =  await this.ethService.sendSignedTransaction(txNonce, this.contractConfigModel, data, 0, gasCost, gasPrice);   
        return txResult;
    }    
}


module.exports = RegistryService;