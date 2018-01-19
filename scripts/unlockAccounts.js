// this doesn't work in latest web3 version!!!!!!!!!!!
// const Web3 = require("web3");
// let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// // Should never be used in Prod
// let accounts = web3.eth.accounts;
// console.log(accounts)
// accounts.forEach(function(address) {
//   web3.personal.unlockAccount(address, '', 99999999);
//   console.log('Unlocking account: ' + address);
// })