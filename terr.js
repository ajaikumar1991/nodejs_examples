// Check dependencies
var http = require('http');
http.createServer(function(req, res) {
  getSQL(function(err, result) {
    res.writeHead(200, {
      'Content-Type' : 'x-application/json'
    });
    res.write(result);
  });
}).listen(8081);

// Access MySQL via node-mysql
// https://github.com/felixge/node-mysql
function getSQL(callback) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '',
        database : 'triple_pulse',
        //socketPath : '/var/run/mysqld/mysqld.sock', // socket for communication from debian <-> client, seems not to be set correcly by default?
    });

    connection.connect();
    var json = '';
    var query = 'SELECT * FROM drmaster';
    connection.query(query, function(err, results, fields) {
        if (err)
            return callback(err, null);

        console.log('The result is: ', results[0]);

        // wrap result-set as json
        json = JSON.stringify(results);
    });
    connection.end();

    callback(null, json);
};
