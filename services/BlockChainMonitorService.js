const EthService = require('./EthService');
const BlockAnalysisService = require('./BlockAnalysisService');
const LocalStorageService = require('./LocalStorageService');
const ConfigurationService = require('./ConfigurationService');
const NonceService = require('./NonceService');

class BlockChainMonitorService
{
    constructor(){
        this.blockAnalysisService = new BlockAnalysisService();
        this.localStorageService = new LocalStorageService();
        this.nonceService = new NonceService();
        this.setBlockchainIntervalTime();
    }    

    setBlockchainIntervalTime(){
        let configurationService = new ConfigurationService();
        let globalSettings = configurationService.getGlobalSettings();
        this.blockCheckIntervalTime = globalSettings.blockCheckIntervalTime;    
    }

    async blockChecker(){
        let ethService = new EthService();
        let block = await ethService.eth.getBlockByNumber('latest', true);
        this.analyseAndRecordBlockData(block);
        console.log("Reconciling Nonce values for contracts....");
        await this.nonceService.syncNoncesWithNetwork();
        await this.sleep();
        this.blockChecker();
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