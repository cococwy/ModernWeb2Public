var http = require('http');
var fs = require("fs");
var url = require('url');

const util = require('util');

var qs, path, method;
var qstring = require('querystring');

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
		username:{type: String, unique: true}, 
		email:{type: String, unique: true},
		fullname: String,
		password: String
	}, 
		{collection: "accounts"}
	);

	mongoose.connect('mongodb://localhost/mydb');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));

  var User = mongoose.model('accounts', userSchema);



http.createServer(function(request, response) {
	
	qs = url.parse(request.url, true);
	path = qs.pathname;
	qs = qs.query;
	method = request.method;
	
	console.log('path: ' + path + ', method: ' + method);
	
	switch (method) {
			
		// Get Files and Search
			
		case "GET":
			
			switch (true) {
				
				case path == "/db":
					User.find({}, function(err, doc){
						if(err) {
							console.log(err);
							return response.end("server error");
						}
						else {
							
							console.log(util.inspect(doc, false, null));
							
							response.writeHead(200, {
								"Content-Type": "text/plain"
							});
							
							if (doc) //return response.end("Name:" + doc.username + "\n" + doc.name + "\n" + doc.password + ".....");
								return response.end(JSON.stringify(doc));
							
							else
								return response.end("password error");
						}
					});
				break;
				
				case path == "/":
					sendFileContent(response, "search.html", "text/html");
				break;
				
				case /^\/[a-zA-Z0-9\/]*.css$/.test(path):
					sendFileContent(response, path.substring(1), "text/css");
				break;
					
				case /^\/[a-zA-Z0-9\/]*.js$/.test(path):
					sendFileContent(response, path.substring(1), "text/javascript");
				break;
					
				case /^\/[a-zA-Z0-9\/]*.png$/.test(path):
					sendFileContent(response, path.substring(1), "image/png");
				break;
					
				case /^\/[a-zA-Z0-9\/]*.ico$/.test(path):
					sendFileContent(response, path.substring(1), "image/x-icon");
				break;
					
				default:
					response.writeHead(404);
					response.write("Not Found!");
					
			}
			
		break;
			
		// Login, Register and Add Entries
			
		case "POST":
			
			formData = '';
      request.on("data", function(data) {
        return formData += data;
      });
			
			switch (path) {
				
				case "/login":
			
					request.on("end", function() {
						var user = qstring.parse(formData);
						useDB({way: 'check', data: user}, response);
						//console.log(checkPW);
					});
					
				break;
					
				case "/register":
					
					request.on("end", function() {
						var user = qstring.parse(formData);
						useDB({way: 'register', data: user}, response);
					});
					
				break;
			}
			
		break;
		
		// Modify existing entries
			
		case "PUT":
			
		break;
			
		case "DELETE":
		
		break;
			
		default:
			
	}
	
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

function useDB(option, response) {

	//db.once('open', function() {
		
			switch(option.way) {

				case "check":

					User.findOne({username:option.data.username, password:option.data.password}, function(err, doc){
						if(err) {
							console.log(err);
							return response.end("server error");
						}
						else {
							
							console.log(util.inspect(doc, false, null));
							
							response.writeHead(200, {
								"Content-Type": "text/plain"
							});
							
							if (doc) //return response.end("Name:" + doc.username + "\n" + doc.name + "\n" + doc.password + ".....");
								return response.end(JSON.stringify(doc));
							
							else
								return response.end("password error");
						}
					});
					
				break;
					
				case "register":
					
					 var newReg = new User({username: option.data.username,
																	email: option.data.email,
																	fullname: option.data.fullname,
																	password: option.data.password
																	});
					//var newReg = new User({username: 'may', name: 'May Li', password: '111111'});
					
						newReg.save(function(err, doc){
							if(err) { 
								console.log(err);
								return response.end("server error");
							}
							else {
								console.log(doc.name + ' saved');
								return response.end(doc.fullname + ' saved');
							}
						});

				break;
					
			}
		
	//});
	
	//console.log(option.way + '\n' + option.data.password);
	
	//return "haha";
}