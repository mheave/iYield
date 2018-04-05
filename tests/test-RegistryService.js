import test from 'ava';
const RegistryService = require('../services/RegistryService');

const validRinkebyAccount = "0x1313734d2D6625173278978DDaa7B63400462745";

var _registryService;

test('can create new instance of service', t => {
	t.notThrows(() => new RegistryService());
});

test.serial.before(t => {
    _registryService = new RegistryService();
});

test('getAllBeneficiaries >> gets list of all beneficiaries', async t => {
	let beneficiaries = await _registryService.getAllBeneficiaries();
	t.not(beneficiaries, null);
});

// getUser
test('getUser >> given a valid address -> return user', async t => {
	let user = await _registryService.getUser(validRinkebyAccount);
	t.not(user, null);
});
test('getUser >> given an invalid address -> return user', async t => {
	await t.throws(_registryService.getUser("invalid_address"));
});

// isValidParticipant
test('isValidParticipant >> given a valid address -> return status', async t => {
	let validParticipant = await _registryService.isValidParticipant(validRinkebyAccount);
	t.not(validParticipant.isValidParticipant, undefined);
});
test('isValidParticipant >> given an invalid address -> return error object', async t => {
	let validParticipant = await _registryService.isValidParticipant("invalid_address");
    t.not(validParticipant.errMsg, undefined);
});

