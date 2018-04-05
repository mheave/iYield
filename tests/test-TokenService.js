import test from 'ava';
const TokenService = require('../services/TokenService');

const validRinkebyAccount = "0xe221cfc94e5f649c20276dec564b28e80f3c0538";

var _tokenService;

test('can create new instance of service', t => {
	t.notThrows(() => new TokenService());
});

test.serial.before(t => {
    _tokenService = new TokenService();
});

// getCurrentRaisedFrtAmount
test('getCurrentRaisedFrtAmount >> can get current raised FRT amount', async t => {
    let raisedFrt = await _tokenService.getCurrentRaisedFrtAmount();
    t.not(raisedFrt.currentContractFrtTotal, undefined);
});

// getTokenBalanceForAddress
test('getTokenBalanceForAddress >> given a valid address -> can get current FRT balance', async t => {
    let balance = await _tokenService.getTokenBalanceForAddress(validRinkebyAccount);
    t.not(balance.balance, undefined);
});
test('getTokenBalanceForAddress >> given an invalid address -> should return error object', async t => {
    let balance = await _tokenService.getTokenBalanceForAddress("invalid_account_address");
    t.not(balance.errMsg, undefined);
});

// getTokenBalanceForAddress
test.skip('getYcBalanceForAddress >> given a valid address -> can get current yieldcoin balance', async t => {
    let balance = await _tokenService.getYcBalanceForAddress(validRinkebyAccount);
    t.not(balance.balance, undefined);
});
test('getYcBalanceForAddress >> given an invalid address -> should return error object', async t => {
    let balance = await _tokenService.getYcBalanceForAddress("invalid_account_address");
    t.not(balance.errMsg, undefined);
});
