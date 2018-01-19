var DataAccessService = require('../services/DataAccessService');
var contractNonceModelDto = require('../models/DTO/contractNonceModel');


class NonceService{
    constructor(){
        this.dataAccessService = new DataAccessService();
    }

    async getCurrentNonceForContract(contractId, callback){
        console.log("getCurrentNonceForContract...");
        
        let currentNonce = await this.getNonceDtoForContract(contractId, function(rowid) {
            console.log('callback: ' + rowid);
            callback(rowid);
        });
        console.log("current nonce:" + currentNonce);
        return currentNonce;
    }

    

    async getNonceDtoForContract(contractId, callback){
       // try{
            let rowData = {};
            let getContractSql = 'select * from yieldcoinapi.t_contract_nonce where contract_id=' + contractId + ' limit 1;';      
            console.log("run query:" + getContractSql);
            await this.dataAccessService.connection.query(getContractSql,{}, function(err, res){
                console.log(res);
                rowData =  res;
                callback(res);
            });
            return rowData;
    }    

    convertRowToDtoObject(rows){
        if(rows != undefined && rows != null && rows.length > 0){
            let id = rows[0].idt_contract_nonce;
            let contractId = row[0].contract_id;
            let currentNonceValue = row[0].current_nonce_value;
            let currentLastUpdated = row[0].current_last_updated;
            let allocatedNonceValue = row[0].allocated_nonce_value;
            let allocatedLastUpdated = row[0].allocated_last_updated;

            let contractNonceDto = contractNonceModelDto(id, contractId, currentNonceValue, currentLastUpdated, allocatedNonceValue, allocatedLastUpdated);        
            console.log(contractNonceDto);
            return contractNonceDto;
        }

        return null;
    }
}

module.exports = NonceService;


