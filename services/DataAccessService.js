var mysql = require('mysql');

class DataAccessService{
    constructor() {
        this.connection = mysql.createConnection( {
            host     : 'localhost',
            user     : 'root',
            password : 'CityWeb01',
            database : 'yieldcoinapi'
          } );
    }

    async executeQuery(sql, args, callback){
        try{
            this.connection.connect();
            this.connection.query(sql, (err, rows, fields) => 
            {
                callback(err, rows);
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

    async query( sql, args ) {

        return await this.connection.query( sql, args);
    }
    async close() {
        return await this.connection.end();
    }
}

module.exports = DataAccessService;