Instructions
------------

1) Check /services/ConfigurationService.js for network connections and account details. At time of editing (31/1/18) these are the Rinkeby test network. The settings can be changed to connect to a locally connected node. In addition to this the configuration objects are in the same file and contain account and contract details (such as address).

2) run via npm start

3) the console will display details on block checking and diagnostics while running

3.5) additional logs and working local storage is done via text files that live in /.node-persist

4) Endpoints - Parameters can be seen in these requests and can also be found in the associated endpoints and service calls.

i) http://localhost:3030/registry/{accountaddress} - POST
ii) http://localhost:3030/tokens/purchase/{beneficiaryaddress}.0x02345.{amounts}.{amountoftokens} - POST [the hex 0x02345 is the currency code for GBP. todo: Need to reconcile list]
iii) http://localhost:3030/tokens/balance/{accountaddress} - GET
iv) http://localhost:3030/transaction/{transactionhash} - GET

NOTE: transactions i and ii are writes and therefore are subject to nonce ordering. Plese wait 15s between transactions until queuing is resolved.


PostMan Export
--------------

The following PostMan export show the endpoints are currently available.

{
	"info": {
		"name": "iYieldContractTesting",
		"_postman_id": "f7805a22-fa4c-b59b-6529-8dc3250475e3",
		"description": "",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "Add 0x03c53c2941ebb7c743dd1d4f1b80405c532fc458 to registry",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"value": "application/json"
					}
				],
				"body": {
					"mode": "raw",
					"raw": ""
				},
				"url": {
					"raw": "http://localhost:3030/registry/0x03c53c2941ebb7c743dd1d4f1b80405c532fc458",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3030",
					"path": [
						"registry",
						"0x03c53c2941ebb7c743dd1d4f1b80405c532fc458"
					]
				},
				"description": ""
			},
			"response": []
		},
		{
			"name": "Token purchase for 0x03c53c2941ebb7c743dd1d4f1b80405c532fc458",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"value": "application/json"
					}
				],
				"body": {
					"mode": "raw",
					"raw": ""
				},
				"url": {
					"raw": "http://localhost:3030/tokens/purchase/0x03c53c2941ebb7c743dd1d4f1b80405c532fc458.0x02345.500.500",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3030",
					"path": [
						"tokens",
						"purchase",
						"0x03c53c2941ebb7c743dd1d4f1b80405c532fc458.0x02345.500.500"
					]
				},
				"description": ""
			},
			"response": []
		},
		{
			"name": "Check transaction status for 0xb026332a9980efa48d70e7cdc4fee6505b803a05554a812e30b293727e6cd08d",
			"request": {
				"method": "GET",
				"header": [],
				"body": {},
				"url": {
					"raw": "http://localhost:3030/transaction/0xb026332a9980efa48d70e7cdc4fee6505b803a05554a812e30b293727e6cd08d",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "3030",
					"path": [
						"transaction",
						"0xb026332a9980efa48d70e7cdc4fee6505b803a05554a812e30b293727e6cd08d"
					]
				},
				"description": ""
			},
			"response": []
		}
	]
}




Rinkeby and Account Settings
-----------------------------

mintable token contract: 0x835c42aaf82e1c49367a4fa012a8f76c50f5caff
registry contract: 0xaa148d4490a4d6b83c7c26ad16f31dda21c3895a
presale contract: 0xd6d387590973f6da8e264d7ab519efaa7e1f5520




Available Accounts
==================
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

Private Keys
==================
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