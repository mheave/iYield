const EthService = require('./EthService');
const BlockAnalysisService = require('./BlockAnalysisService');
const LocalStorageService = require('./LocalStorageService');

const blockCheckIntervalTime = 10000;

class BlockChainMonitorService
{
    constructor(){
        this.blockAnalysisService = new BlockAnalysisService();
        this.localStorageService = new LocalStorageService();
    }    

    async blockChecker(){
        let ethService = new EthService();
        let block = await ethService.eth.getBlockByNumber('latest', true);
        this.analyseAndRecordBlockData(block);
        await this.sleep();
        this.blockChecker();
    }

    analyseAndRecordBlockData(block){
        let blockModel = this.blockAnalysisService.analyseBlockAndReturnModel(block);
        this.localStorageService.addItemToList('blockModel', blockModel);        
    }


    sleep() {
        return new Promise(resolve => setTimeout(resolve, blockCheckIntervalTime));
    }
}

module.exports = BlockChainMonitorService;