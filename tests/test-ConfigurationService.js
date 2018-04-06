import test from 'ava';
const ConfigurationService = require('../services/ConfigurationService');

var _configService;

test('can create new instance of service', t => {
	t.notThrows(() => new ConfigurationService());
});

test.serial.before(t => {
    _configService = new ConfigurationService();
});

test('getGlobalSettings >> can get global settings object', async t => {
	let globalSettings = _configService.getGlobalSettings();
	t.not(globalSettings, null);
});

test('getLocalStorageSettings >> can get local storage settings and contracts', t => {
	let localStorageSettings = _configService.getLocalStorageSettings();
	t.not(localStorageSettings.currentContractsSettings, null);
});





