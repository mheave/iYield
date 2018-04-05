import test from 'ava';
const EthService = require('../services/EthService');
const contractConfigModel = require('../models/ContractConfigModel');
const ABI = require('../config/ABI.js');

const validRinkebyAccount = "0x1313734d2D6625173278978DDaa7B63400462745";
const validRinkebyRegistryContractAddress = "0x0BbDfFFA5b03422491b11b2b72B0b2Cf28045bC7";
const validRinkebyTxHash = "0x7c0b35780c74c7909e8a1270de0dac4f049d169aca16e8744695517ce1ed17a4";

var _ethService;

test('can create new instance of service', t => {
	t.notThrows(() => new EthService());
});

test.serial.before(t => {
    _ethService = new EthService();
});


test('EthService contains valid eth-js instance', t => {
	t.not(_ethService.eth, null);
});

test('given a contract configuration -> can get contract from network', async t => {
    let contractConfig = getRegistryContractConfig();
    var contract;
    await t.notThrows(contract = _ethService.getContractFromConfig(contractConfig));
    t.not(contract, null);
});

test('given a valid Tx hash -> can get status from network', async t => {
    let txStatus;
    await t.notThrows(txStatus = _ethService.getTransactionStatusFromNetwork(validRinkebyTxHash));
    t.not(txStatus, null);    
});

test('given a valid Tx hash -> can get Tx receipt from network', async t => {
    let txReceipt;
    await t.notThrows(txReceipt = _ethService.getTransactionReceiptFromNetwork(validRinkebyTxHash));
    t.not(txReceipt, null);    
});

test('given a valid account -> can get current Nonce value', async t => {
    let nonce;
    await t.notThrows(nonce = _ethService.getCurrentNonceForAccount(validRinkebyAccount));
    t.not(nonce, null)
});

test('given a valid method name and ABI -> can return method', t => {
    let methodName = "setPauseState";
    let abi = ABI.IYPresaleAbi;    
    let method = _ethService.getMethodFromAbi(methodName, abi);
    t.is(method.name, methodName);
});

test('given a valid method name, data and ABI -> can create a valid transaction data object', t => {
    let methodToCall = "setPauseState";
    let stateToSet = [true];
    let abi = ABI.IYPresaleAbi;

    let expectedTransactionObject = "0xcdb88ad10000000000000000000000000000000000000000000000000000000000000001";

    let data = _ethService.createTransctionDataObject(methodToCall,stateToSet, abi); 
    t.is(data, expectedTransactionObject);
});


function getRegistryContractConfig() {
    return contractConfigModel(validRinkebyRegistryContractAddress, "", "", ABI.RegistryAbi);
}
