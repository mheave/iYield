const EthService = require('./EthService');
const BlockAnalysisService = require('./BlockAnalysisService');
const LocalStorageService = require('./LocalStorageService');
const ConfigurationService = require('./ConfigurationService');
const TransactionService = require('./TransactionService');

class BlockChainMonitorService
{
    constructor(){
        this.blockAnalysisService = new BlockAnalysisService();
        this.localStorageService = new LocalStorageService();
        this.transactionService = new TransactionService();
        this.setBlockchainIntervalTime();
    }    

    setBlockchainIntervalTime(){
        let configurationService = config;
        let globalSettings = configurationService.getGlobalSettings();
        this.blockCheckIntervalTime = globalSettings.blockCheckIntervalTime;    
    }

    async checkPendingTransactionsForReceipts(){
        let pendingTransactions = this.transactionService.getPendingTransactions();
        if(!pendingTransactions || pendingTransactions.length < 1){
            await this.sleep();
            this.checkPendingTransactionsForReceipts();  
            return;
        }
        let ethService = new EthService();        
        for(var t = 0; t < pendingTransactions.length; t++){
            let tx = pendingTransactions[t];
            let txReceipt = await ethService.eth.getTransactionReceipt(tx.transactionHash);
            if(txReceipt){
               await this.analyseAndProcessTransactionReceipt(txReceipt);
            }
        }

        await this.sleep();
        this.checkPendingTransactionsForReceipts(); 
    }

    async analyseAndProcessTransactionReceipt(txReceipt){
        if(txReceipt){
            this.transactionService.setPendingTransactionToComplete(txReceipt)        
        }
    }

    async blockChecker(){
        let lastSeenBlock = this.getLastRecordedSeenBlock();
        let ethService = new EthService();
        let block = await ethService.eth.getBlockByNumber('latest', true);
        let blockNumber = block.number.toNumber();
        if(lastSeenBlock <  blockNumber){
            this.analyseAndRecordBlockData(block);
            this.setLastSeenBlock(blockNumber);
        }
        await this.sleep();
        this.blockChecker();
    }    

    

    setLastSeenBlock(blockNumber){
        this.localStorageService.addOrUpdateItemInStorage('lastBlock', blockNumber);
    }

    getLastRecordedSeenBlock(){
        let lastBlock = this.localStorageService.getItemFromStorage('lastBlock');
        return lastBlock;
    }

    analyseAndRecordBlockData(block){       
        let blockModel = this.blockAnalysisService.analyseAndProcessBlock(block);
        if(blockModel != null){
            this.localStorageService.addItemToList('blockModel', blockModel);        
            this.localStorageService.addItemToList('blocks', block);
        }
    }

    sleep() {
        return new Promise(resolve => setTimeout(resolve, this.blockCheckIntervalTime));
    }
}

module.exports = BlockChainMonitorService;