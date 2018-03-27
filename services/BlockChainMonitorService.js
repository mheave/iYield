const extractContractEvents = require('@digicat/ethereum-extract-contract-events')

const EthService = require('./EthService');
const LocalStorageService = require('./LocalStorageService');
const ConfigurationService = require('./ConfigurationService');
const TransactionService = require('./TransactionService');

const ContractEvent = require('../models/blockchain/ContractEventModel');
const SpentTransactionModel = require('../models/blockchain/SpentTransactionModel');


class BlockChainMonitorService
{
    constructor(){
        this.localStorageService = new LocalStorageService();
        this.transactionService = new TransactionService();
        this.configurationService = new ConfigurationService();
        this.setBlockchainIntervalTime();
    }    

    setBlockchainIntervalTime(){
        let globalSettings = this.configurationService.getGlobalSettings();
        this.blockCheckIntervalTime = globalSettings.blockCheckIntervalTime;    
    }

    async checkPendingTransactionsForReceipts(){
        let pendingTransactions = this.localStorageService.getPendingTransactions();
        if(!pendingTransactions || pendingTransactions.length < 1){
            await this.sleep();
            this.checkPendingTransactionsForReceipts();  
            return;
        }

        // We have some pending transactions. Check for Receipts.
        let ethService = new EthService();        
        for(var t = 0; t < pendingTransactions.length; t++){
            let tx = pendingTransactions[t];
            if(!tx.transactionHash || tx.transactionHash === ""){
                continue;
            }
            let txReceipt = await ethService.eth.getTransactionReceipt(tx.transactionHash);
            if(txReceipt){
               await this.analyseAndProcessTransactionReceipt(tx, txReceipt);
            }
        }

        await this.sleep();
        this.checkPendingTransactionsForReceipts(); 
    }

    async analyseAndProcessTransactionReceipt(pendingTx, txReceipt){
        if(txReceipt){
            let contractConfig = this.configurationService.getIyPresaleContractConfig();

            let events = extractContractEvents({
                contractAbi: contractConfig.abi,
                contractAddress: contractConfig.contractAddress,
                logs: txReceipt.logs
              })       
              
            let spentTransactionModel = SpentTransactionModel(pendingTx.name, pendingTx.transactionHash, txReceipt.status, pendingTx, txReceipt, events);
            this.transactionService.setPendingTransactionToComplete(spentTransactionModel)        
        }
    }

    sleep() {
        return new Promise(resolve => setTimeout(resolve, this.blockCheckIntervalTime));
    }
}

module.exports = BlockChainMonitorService;