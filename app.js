var http = require("http");

http.createServer(function(request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/plain'
    });

    // DB Credentials
    var mysql = require("mysql");

    // database credentails username: ad_trymobileapp passeord: 10@tryapp.
    // azure thiruchittrambalam@gmail.com, #pillayar10 http://portal.azure.com.

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "triple_pulse"
    });

    con.connect(function(err) {
        console.log("**********************************************");
        console.log("******* Mysql Connection Established *********");
        console.log("**********************************************");

        if (!err) {
        } else {
            console.log('Error connecting to Db');
            return;
        }
        //response.end('Connection established');
    });

    console.log("**************************************");
    console.log("******* Running Delete Query *********");
    console.log("**************************************");

    con.query("DELETE FROM drmaster", function(err, rows, fields) {
        if (err) throw err;
    });
    console.log("**************************************");
    console.log("******* Running Insert Query *********");
    console.log("**************************************");

    var drmaster1 = {DrId:'1',DrFirstName:'sam',DrLastName:'ronald',DrMobile:'1234567890',DrPhone:'',DrEmail:'',DrPhoto:'',DrDOB:'',DrWedAnniv:'',QualID:'1' };
    con.query('INSERT INTO drmaster SET ?', drmaster1, function(err,res){
        if(err) throw err;

        console.log('Last insert ID:', drmaster1.DrId);
    });

    con.query('SELECT * FROM drmaster', function(err, rows) {
        if (err) throw err;

        console.log(rows);
    });


    //Update Query

    console.log("**************************************");
    console.log("******* Running Update Query *********");
    console.log("**************************************");

    con.query('Update drmaster SET ? where ?',[{DrFirstName: 'Ajai'},{DrID:1}], function(err, rows, fields) {
        if (err) throw err;
    });

    // Select query

    console.log("**************************************");
    console.log("******* Running Select Query *********");
    console.log("**************************************");

    con.query('SELECT * FROM drmaster', function(err, rows) {
        if (err) throw err;

        response.write('Data received from Db:');
        console.log(rows);
        response.write(JSON.stringify(rows));

    });

    con.end(function(err) {

        // The connection is terminated gracefully
        // Ensures all previously enqueued queries are still
        // before sending a COM_QUIT packet to the MySQL server.

        console.log("***************************************");
        console.log("******* Closing DB Connection *********");
        console.log("***************************************");
    });
}).listen(8081);