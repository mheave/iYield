# Endpoints

## Contract:

* GET - /contract/pausestate

* GET - /contract/currentroundtotal 			<- current FRT total

* GET - /contract/endtime

* POST - /contract/paused/{pausestate}		<- true to pause, false to unpause

* POST - /contract/updateendtime/{datetime}	<- NOTE: datetime is of type Unix Epoch (# seconds since 1/1/1970) [https://en.wikipedia.org/wiki/Unix_time]



## Registry:

* GET - /registry/allbeneficiaries

* GET - /registry/isvalidparticipant/{address}

* GET - /registry/{address}

* POST - /registry/{address}					<- add to registry

* POST - /registry/{originator}/{beneficiary} <- add to registry



## Token:

* GET - /tokens/balance/yieldcoin/{address}

* GET - /tokens/balance/{address}				<- FRT balance

* POST - /tokens/migrate

* POST - /tokens/purchase/{beneficiary}/{currency}/{currencyAmount}/{tokenAmount}



## Transaction:

* GET - /transaction/{txHash}

* GET - /transaction/network/{txHash}



# Instructions

1) Check /services/ConfigurationService.js for network connections and account details. At time of editing (29/03/18) these are the Rinkeby test network. The settings can be changed to connect to a locally connected node. In addition to this the configuration objects are in the same file and contain account and contract details (such as address).

2) run via npm start


### Available Accounts

(0) 0x1313734d2d6625173278978ddaa7b63400462745

(1) 0x10b50646ffc614d9df474ee379971185e538714b

(2) 0xf5b1b23448f8f970ce3aec7fd78ab8eec819d161

(3) 0x1e4845806405f051cde56b360f68c65615a6f3d4

(4) 0xdf6ffe1d380e273702140937fb67c6eeb52d34f9

(5) 0xe221cfc94e5f649c20276dec564b28e80f3c0538

(6) 0x7b7c2642cf7d6b51ef57e397629d6d8ac99b4e44

(7) 0x5fa58d954cd1ca6ae38adbaacdcc8ac5575cacb5

(8) 0x5d64de128ca6fa842cdab553a09c3b8d9914861a

(9) 0x03c53c2941ebb7c743dd1d4f1b80405c532fc458


### Private Keys

(0) 673a54beee87f667d9204d314433b04e49011d1a4caa74bf166830d6d7570515

(1) 674ff6c4e11562908f96f35386b62dd5ddbd0456c738729a5221bb112044dae8

(2) d496f347b97c017539730bf97cbec6b9c7e2affee851d55f11d2eb0665075867

(3) 84120f95a3e40ab36bb8e7aa5bb902a82d9fe63b7500198012479d61b5173c88

(4) d0ac6fb19621d2c7ce658f46ff9c28cc84df304ee30b8b868c53c48c66af7751

(5) 522e07df5b3dc9d1d00a2f0a05c36b49429610ac578669ad16d738bce36f27de

(6) 337de025d9cd550eacec4e5ddcf104af39c1182f5c2a598fa11ac71d43ea7026

(7) 29b55668f1910ca114c65b88d45a4de181b9b663584423b9582512d510da3181

(8) ad9ebe82b8ab3bf839a938400b7b1e51d87bb73b6214e075c2c0d41342f655b3

(9) 4d588af80487a8aaf908d15ac56f4ab80f6c05f387736044d1f4e7b978ea08e2
