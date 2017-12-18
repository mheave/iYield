const config = require('../config')
const request = require('request')
const BigNumber = require('bignumber.js');
const ethAccounts = require('ethjs-account')

let accounts = []

for(let i=0;i<10;i++) {
  accounts[i] = ethAccounts.generate(BigNumber.random(256).toString())
}

path = 'http://localhost:3030/registry/'

// request.post(path + accounts[0].address, function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// })

// maybe run after the get all so we can use on of those addresses

request.get(path, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.

  let addresses = JSON.parse(body)

  request.delete(path + addresses.registered[0], function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  })

});





// Generate a random address




//request.post(config.ethNode + '/registry/')

//@todo write script so we can execute and test results of functions
