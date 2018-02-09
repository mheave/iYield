const EthService = require('./EthService');
const BlockAnalysisService = require('./BlockAnalysisService');
const LocalStorageService = require('./LocalStorageService');
const ConfigurationService = require('./ConfigurationService');

class BlockChainMonitorService
{
    constructor(){
        this.blockAnalysisService = new BlockAnalysisService();
        this.localStorageService = new LocalStorageService();
        this.setBlockchainIntervalTime();
    }    

    setBlockchainIntervalTime(){
        let configurationService = config;
        let globalSettings = configurationService.getGlobalSettings();
        this.blockCheckIntervalTime = globalSettings.blockCheckIntervalTime;    
    }

    async blockChecker(){
        let ethService = new EthService();
        let block = await ethService.eth.getBlockByNumber('latest', true);
        this.analyseAndRecordBlockData(block);
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