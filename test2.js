var http = require('http');

http.createServer(function(request, response) {
  var headers = request.headers;
  var method = request.method;
  var url = request.url;
  var body = [];

  request.on('error', function(err) {
    console.error(err);
  }).on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    body = Buffer.concat(body).toString();

   // BEGINNING OF NEW STUFF

   response.on('error', function(err) {
      console.error(err);
    });
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');

   // Note: the 2 lines above could be replaced with this next one:
    // response.writeHead(200, {'Content-Type': 'application/json'})



    var mysql = require("mysql");
	var con = mysql.createConnection({
	        host: "localhost",
	        user: "root",
	        password: "",
	        database: "sitepoint"
	    });
	    con.connect(function(err) {
	        if (err) {
	            console.log('Error connecting to Db');
	  			return;
	        }
	        console.log("********Mysql Connection Established**********");
	        //response.end('Connection established');
	    });
	    // Select query
	    console.log("********Running Select Query**********");
	    con.query('SELECT * FROM employees', function(err, rows) {
	        if (err) throw err;
	        response.write('Data received from Db:');
	        console.log(rows);
	        //response.write(JSON.stringify(rows));

	    console.log("********Select Query Executed**********");


    response.write(JSON.stringify(rows));
    response.end();
    	    });

    });
}).listen(8081);