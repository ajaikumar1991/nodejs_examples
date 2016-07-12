/*

What is Callback ?

Callback is an asynchronous equivalent for a function.

A callback function is called at the completion of a given task. Node makes heavy use of callbacks. All APIs of Node are written is such a way that they supports callbacks.

For example, a function to read a file may start reading file and return the control to execution environment immidiately so that next instruction can be executed. Once file I/O is complete, it will call the callback function while passing the callback function, the content of the file as parameter. So there is no blocking or wait for File I/O. This makes Node.js highly scalable, as it can process high number of request without waiting for any function to return result.*/

// Example - 1 :Blocking Code Example

/*var http=require("http");

http.createServer(function(request,response){

response.writeHead(200,{'Content-Type':'text/plain'});

var fs = require("fs");

var data = fs.readFileSync('input.txt');

//console.log(data.toString());

response.end(data.toString());

console.log('Server running at http://localhost:8081/');

console.log("Program Ended");

}).listen(8081);*/

// Example - 2 :Blocking Code Example

var http=require("http");

http.createServer(function(request,response){

	response.writeHead(200,{'Content-Type':'text/plain'});
	var fs = require("fs");
	fs.readFile('input.txt', function (err, data) {

    if (err) return console.error(err);
    	//console.log(data.toString());
    	response.end(data.toString());
		});
	console.log("Program Ended");
}).listen(8081);