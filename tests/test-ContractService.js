import test from 'ava';
const ContractService = require('../services/ContractService');

var _contractService;


test('can create new instance of service', t => {
	t.notThrows(() => new ContractService());
});

test.serial.before(t => {
    _contractService = new ContractService();
});

test('can get pause state from contract', async t => {
    let pauseState = await _contractService.getPauseState();
    t.not(pauseState.isPaused, undefined);
});

test('can get end time from contract', async t => {
    let endTime = await _contractService.getEndtime();
    t.not(endTime.endtime, undefined);
});