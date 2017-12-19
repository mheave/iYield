var mysql = require('mysql');

class DataAccessService{
    constructor(){
        this.connection =  mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : 'CityWeb01',
            database : 'yieldcoinapi'
          });
    }

    testGetSomthing(){
        this.connection.connect();
        this.connection.query('SELECT * FROM yieldcoinapi.t_transaction_queue;', function(err, rows, fields) {
            if (!err){
                console.log(app);
                console.log('The solution is: ', rows);
            }
            else{
                console.log('Error while performing Query.');                
            }
          });
          
        this.connection.end();

    }


}


module.exports = DataAccessService;