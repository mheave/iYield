var DataAccessService = require('../services/DataAccessService');
var contractNonceModelDto = require('../models/DTO/contractNonceModel');


class NonceService{
    constructor(){
        let dataAccessService = new DataAccessService();
        this.connection = dataAccessService.getConnection();
    }

    getCurrentNonceForContract(contractId){
        console.log("getCurrentNonceForContract...");
        
        let nonceDto = this.getNonceDtoForContract(contractId);
        console.log("getNonceDtoForContract...");
        
        if(nonceDto === null)
            return {};

        return nonceDto;
    }

    getNonceDtoForContract(contractId){
        try{
            this.connection.connect();
            let getContractSql = 'select * from yieldcoinapi.t_contract_nonce where contract_id=' + contractId + ' limit 1;'      
            console.log("run query:" + getContractSql);
            this.connection.query(getContractSql, (err, rows, fields) => {
                if(!err){
                    console.log(rows);
                    return rows;
                }
                else{
                    console.log(err);
                    return null;
                }
            });
        }
        catch(err){
            console.log(err);
            return null;
        }
        finally{
            this.connection.end();
        }
    }
}

module.exports = NonceService;