// Step 1: We use require directive to load http module and store returned HTTP instance into http variable as follows -


var http=require("http");


// Step 2: Create Server
// http.createServer() method to create server instance and then we bind it at port 8081 using listen method associated with server instance. Pass it a function with parameters request and response.

http.createServer(function (request, response) {

// http heaader syntax
// http status : 200
// http content type : text plain

response.writeHead(200,{'Content-Type':'text/plain'});

// Send the response body as "Hello World"

   response.end('Hello World\n');

}).listen(8081);

// Console will print the message

console.log('Server running at http://localhost:8081/');


