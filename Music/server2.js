var http = require('http');
var fs = require("fs");
var mongodb = require('mongodb');
var mongodbServer = new mongodb.Server('localhost', 27017, { auto_reconnect: true, poolSize: 10 });
var db = new mongodb.Db('mydb', mongodbServer);
var url = require('url');
//const util = require('util')
var qs, path, method;
var qstring = require('querystring');
//var qs = require("querystring");
/*
var sessions = require("client-sessions");

var session = sessions({
  cookieName: 'mySession',
  secret: 'blargadeeblargblarg', 
  duration: 24 * 60 * 60 * 1000, 
  activeDuration: 1000 * 60 * 5
});
*/

http.createServer(function(request, response) {
	
	qs = url.parse(request.url, true);
	path = qs.pathname;
	qs = qs.query;
	method = request.method;

	//session(req, res, function(){ console.log('session done!'); });
	
	if(request.url === "/search"){
		sendFileContent(response, "search.html", "text/html");
	}
	else if(request.url === "/"){
		console.log("Requested URL is url" +request.url);
		//response.writeHead(200, {'Content-Type': 'text/html'});
		//response.write('<b>Hey there!</b><br /><br />This is the default response. Requested URL is: ' + request.url);
	}
	else if(path === "/signup"){
		console.log("Requested URL is url" +request.url);
		  formData = '';
      request.on("data", function(data) {
        return formData += data;
      });
      return request.on("end", function() {
        var user;
        user = qstring.parse(formData);
        response.writeHead(200, {
          "Content-Type": "text/html"
        });
        return response.end("<h1>" + user.username + "歡迎您的加入</h1><p>我們已經將會員啟用信寄至" + user.email + "</p>");
      });
	//	response.writeHead(200, {'Content-Type': 'text/html'});
	//	response.write('<b>Sign up page</b><br /><br />This is the default response. Requested URL is: ' + request.url);
	}
	else if(/^\/[a-zA-Z0-9\/]*.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
	}
	else if(/^\/[a-zA-Z0-9\/]*.css$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/css");
	}
  else if(/^\/[a-zA-Z0-9\/]*.png$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "image/png");
	}
	else if (path === "/login") {
		/*checkPW(qs.username, qs.password);
		sendFileContent(response, "searchicon.png", "image/png");
		console.log("querystring = " + qs);*/
		//response.writeHead(200, {'Content-Type': 'text/html'});
		//response.end('form ok');
		  formData = '';
      request.on("data", function(data) {
        return formData += data;
      });
      request.on("end", function() {
        var user;
        user = qstring.parse(formData);
        response.writeHead(200, {
          "Content-Type": "text/plain"
        });
        return response.end("Name:" + user.username + "歡迎您的加入</h1><p>" + method + "我們已經將會員啟用信寄至" + user.password + "</p>");
			});
	}				
	else {
		//console.log("Requested URL is: " + request.url);
		response.end();
	}
	/*
	console.log("Requested URL is: " + request.url);
	console.log("Path is: " + qs.pathname);
	console.log("querystring = " + qs.query);
	console.log("username = " + qs.query.username);
	*/
}).listen(9998)

function sendFileContent(response, fileName, contentType){
	fs.readFile(fileName, function(err, data){
		if(err){
			response.writeHead(404);
			response.write("Not Found!");
		}
		else{
			response.writeHead(200, {'Content-Type': contentType});
			response.write(data);
		}
		response.end();
	});
}

function checkPW(login, password) {
	db.open(function() {
			/* Select 'contact' collection */
				db.collection('handle', function(err, collection) {
						/* Querying */
						collection.find({ 'username': login }).toArray(function(err, data) {
						//collection.find({ 'username': 'eric' }, function(err, data) {
								/* Found this People */
								if (data[0].username) {
										console.log('username: ' + data[0].username);
										//console.log('Name: ' + data[0].name + ', username: ' + data[0].username);
										//console.log(util.inspect(data, false, null));
										//console.log(data);
								} else {
										console.log('Cannot found');
								}
						});
				});
		});
	db.close();
}