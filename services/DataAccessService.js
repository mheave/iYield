var mysql = require('mysql');

class DataAccessService{
    constructor(){
        this.setupConnection();
    }

    setupConnection(){
        this.connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : 'CityWeb01',
            database : 'yieldcoinapi'
          });
    }

    getConnection(){
        return this.connection;
    }
}

module.exports = DataAccessService;