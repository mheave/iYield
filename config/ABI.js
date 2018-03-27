
exports.MintableCoinAbi =       [  
    {  
       "constant":true,
       "inputs":[  

       ],
       "name":"mintingFinished",
       "outputs":[  
          {  
             "name":"",
             "type":"bool"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    {  
       "constant":true,
       "inputs":[  

       ],
       "name":"totalSupply",
       "outputs":[  
          {  
             "name":"",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    {  
       "constant":false,
       "inputs":[  
          {  
             "name":"_to",
             "type":"address"
          },
          {  
             "name":"_amount",
             "type":"uint256"
          }
       ],
       "name":"mint",
       "outputs":[  
          {  
             "name":"",
             "type":"bool"
          }
       ],
       "payable":false,
       "stateMutability":"nonpayable",
       "type":"function"
    },
    {  
       "constant":true,
       "inputs":[  
          {  
             "name":"_owner",
             "type":"address"
          }
       ],
       "name":"balanceOf",
       "outputs":[  
          {  
             "name":"balance",
             "type":"uint256"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    {  
       "constant":false,
       "inputs":[  

       ],
       "name":"finishMinting",
       "outputs":[  
          {  
             "name":"",
             "type":"bool"
          }
       ],
       "payable":false,
       "stateMutability":"nonpayable",
       "type":"function"
    },
    {  
       "constant":true,
       "inputs":[  

       ],
       "name":"owner",
       "outputs":[  
          {  
             "name":"",
             "type":"address"
          }
       ],
       "payable":false,
       "stateMutability":"view",
       "type":"function"
    },
    {  
       "constant":false,
       "inputs":[  
          {  
             "name":"_to",
             "type":"address"
          },
          {  
             "name":"_value",
             "type":"uint256"
          }
       ],
       "name":"transfer",
       "outputs":[  
          {  
             "name":"",
             "type":"bool"
          }
       ],
       "payable":false,
       "stateMutability":"nonpayable",
       "type":"function"
    },
    {  
       "constant":false,
       "inputs":[  
          {  
             "name":"newOwner",
             "type":"address"
          }
       ],
       "name":"transferOwnership",
       "outputs":[  

       ],
       "payable":false,
       "stateMutability":"nonpayable",
       "type":"function"
    },
    {  
       "anonymous":false,
       "inputs":[  
          {  
             "indexed":true,
             "name":"to",
             "type":"address"
          },
          {  
             "indexed":false,
             "name":"amount",
             "type":"uint256"
          }
       ],
       "name":"Mint",
       "type":"event"
    },
    {  
       "anonymous":false,
       "inputs":[  

       ],
       "name":"MintFinished",
       "type":"event"
    },
    {  
       "anonymous":false,
       "inputs":[  
          {  
             "indexed":true,
             "name":"from",
             "type":"address"
          },
          {  
             "indexed":true,
             "name":"to",
             "type":"address"
          },
          {  
             "indexed":false,
             "name":"value",
             "type":"uint256"
          }
       ],
       "name":"Transfer",
       "type":"event"
    }
 ];


exports.RegistryAbi =[
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "Register",
    "outputs": [
      {
        "name": "beneficiary",
        "type": "address"
      },
      {
        "name": "index",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "originator",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "beneficiary",
        "type": "address"
      }
    ],
    "name": "ParticipantAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "originator",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "beneficiary",
        "type": "address"
      }
    ],
    "name": "ParticipantUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "originator",
        "type": "address"
      }
    ],
    "name": "ParticipantRemoved",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_originator",
        "type": "address"
      },
      {
        "name": "_beneficiary",
        "type": "address"
      }
    ],
    "name": "addParticipant",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_originator",
        "type": "address"
      },
      {
        "name": "_beneficiary",
        "type": "address"
      }
    ],
    "name": "updateParticpant",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_originator",
        "type": "address"
      }
    ],
    "name": "removeParticipant",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_originator",
        "type": "address"
      }
    ],
    "name": "isValidParticipant",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_originator",
        "type": "address"
      }
    ],
    "name": "participantExists",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getAllBeneficiaries",
    "outputs": [
      {
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_account",
        "type": "address"
      }
    ],
    "name": "getBeneficiary",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

  exports.IYPresaleAbi =  [
    {
      "constant": true,
      "inputs": [],
      "name": "rate",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "endTime",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "currencies",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "yieldCoin",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "weiRaised",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferYieldCoinOwnership",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "isCrowdsale",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "wallet",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "startTime",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalMigrated",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_account",
          "type": "address"
        }
      ],
      "name": "migrateAccount",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "crowdsaleTitle",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "currencyRaised",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_state",
          "type": "bool"
        }
      ],
      "name": "setPauseState",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_beneficiary",
          "type": "address"
        },
        {
          "name": "_currency",
          "type": "bytes32"
        },
        {
          "name": "_currencyAmount",
          "type": "uint256"
        },
        {
          "name": "_tokenAmount",
          "type": "uint256"
        }
      ],
      "name": "currencyTokenPurchase",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_currency",
          "type": "bytes32"
        },
        {
          "name": "_decimals",
          "type": "uint256"
        }
      ],
      "name": "amendCurrencies",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "saleRegistry",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_account",
          "type": "address"
        }
      ],
      "name": "buyTokens",
      "outputs": [],
      "payable": true,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "hasEnded",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_beneficiary",
          "type": "address"
        },
        {
          "name": "_currency",
          "type": "bytes32"
        },
        {
          "name": "_currencyAmount",
          "type": "uint256"
        },
        {
          "name": "_tokenAmount",
          "type": "uint256"
        }
      ],
      "name": "currencyTokenRefund",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "token",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_startTime",
          "type": "uint256"
        },
        {
          "name": "_endTime",
          "type": "uint256"
        },
        {
          "name": "_rate",
          "type": "uint256"
        },
        {
          "name": "_wallet",
          "type": "address"
        },
        {
          "name": "_registry",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "constructor"
    },
    {
      "payable": true,
      "type": "fallback"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "MigratedAccount",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "pauseState",
          "type": "bool"
        }
      ],
      "name": "ContributionsPaused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        }
      ],
      "name": "OwnerTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "account",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "currency",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "currencyAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "tokenAmount",
          "type": "uint256"
        }
      ],
      "name": "CurrencyTokenPurchased",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "account",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "currency",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "currencyAmount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "tokenAmount",
          "type": "uint256"
        }
      ],
      "name": "CurrencyTokenRefund",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "currency",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "decimals",
          "type": "uint256"
        }
      ],
      "name": "AmendedCurrencies",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "purchaser",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "beneficiary",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "TokenPurchase",
      "type": "event"
    }
  ];
