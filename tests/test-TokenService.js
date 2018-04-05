import test from 'ava';
const TokenService = require('../services/TokenService');

var _tokenService;


test('can create new instance of service', t => {
	t.notThrows(() => new TokenService());
});

test.serial.before(t => {
    _tokenService = new TokenService();
});