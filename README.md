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