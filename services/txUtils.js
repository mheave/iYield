const Eth = require('ethjs');
const ethAbi = require('ethjs-abi');
const _ = require('lodash')
const sign = require('ethjs-signer').sign
const BN = require('bignumber.js')


/*
 * abi: array: full contract abi array
 * name: string: contract function name
 * params: array: list of function parameters   
 */
// let encodeData = (abi, name, params) => {
//   let abiMethod = _.find(abi, function(item) { return item.name == name})
//   return ethAbi.encodeMethod(abiMethod, [originator, benefactor])
// }

// let fetchNonce = (address) => {

// }

// let signAndSend = () => {

// }