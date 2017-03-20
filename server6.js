var http = require('http');
var fs = require("fs");
var url = require('url');



var requesturl = require("request");

const util = require('util');

var qs, path, method;
var qstring = require('querystring');

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
		username:{type: String, unique: true}, 
		email:{type: String, unique: true},
		fullname: String,
		password: String,
		favourites: [Number]
		//regDate: Date
		//validation: Boolean
	}, 
		{collection: "accounts"}
	);

var trackSchema = new mongoose.Schema({
		trackId:{type: Number, unique: true}, 
		trackName: String,
		artistName: String,
		collectionName: String,
		artworkUrl100: String,
		previewUrl: String,
		likes: Number
	}, 
		{collection: "trackDB"}
	);

mongoose.connect('mongodb://localhost/mydb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var User = mongoose.model('accounts', userSchema);
var TrackDB = mongoose.model('trackDB', trackSchema);


var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
     service: 'Gmail', // no need to set host or port etc.
     auth: {
         user: 'eric.305cde@gmail.com',
         pass: '305cdefg'
     }
});

const ourURL = 'http://305-mean-stack-mozarthk7425541.codeanyapp.com:9998';
const mPath = "./Music/";

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
					
				case path == "/hit":
					
					requesturl('https://api.douban.com/v2/music/search?q=hit%20that', function (error, res, body) {
							response.writeHead(200, {"Content-Type": "text/json"});
							response.end(body);
					});
					
				break;
				
				case path == "/db":
					User.find({}, function(err, doc){
						if(err) {
							console.log(err);
							return response.end("server error");
						}
						else {
							
							console.log(util.inspect(doc, false, null));
							
							response.writeHead(200, {
								"Content-Type": "text/json"
							});
							
							if (doc) //return response.end("Name:" + doc.username + "\n" + doc.name + "\n" + doc.password + ".....");
								return response.end(JSON.stringify(doc));
							
							else
								return response.end("password error");
						}
					});
				break;

				case path == "/dbasc":
					User.find({}, null, {skip:0, limit:5, sort:{username: -1}}, function(err, doc){
						if(err) {
							console.log(err);
							return response.end("server error");
						}
						else {
							
							console.log(util.inspect(doc, false, null));
							
							response.writeHead(200, {
								"Content-Type": "text/json"
							});
							
							if (doc) //return response.end("Name:" + doc.username + "\n" + doc.name + "\n" + doc.password + ".....");
								return response.end(JSON.stringify(doc));
							
							else
								return response.end("password error");
						}
					});
				break;
					
				case path == "/likes":
					TrackDB.find({}, function(err, doc){
						if(err) {
							console.log(err);
							return response.end("server error");
						}
						else {
							
							console.log(util.inspect(doc, false, null));
							
							response.writeHead(200, {
								"Content-Type": "text/json"
							});
							
							if (doc) //return response.end("Name:" + doc.username + "\n" + doc.name + "\n" + doc.password + ".....");
								return response.end(JSON.stringify(doc));
							
							else
								return response.end("password error");
						}
					});
				break;
					
				case path == "/top":
					TrackDB.find({}, null, {skip:0, limit:10, sort:{likes: -1}}, function(err, doc){
						if(err) {
							console.log(err);
							return response.end("server error");
						}
						else {
							
							console.log(util.inspect(doc, false, null));
							
							response.writeHead(200, {
								"Content-Type": "text/json"
							});
							
							if (doc) //return response.end("Name:" + doc.username + "\n" + doc.name + "\n" + doc.password + ".....");
								return response.end(JSON.stringify(doc));
							
							else
								return response.end("password error");
						}
					});
				break;
					
				case path == "/lyric":
					
					response.writeHead(200, {"Content-Type": "text/plain"});
					//console.log('qs');
					if (qs.q) {
							requesturl('http://gecimi.com/api/lyric/' + qs.q, function (error, res, body) {
								if (error) return response.end("Cannot find lyrics.");
								//response.end(body);
								body = JSON.parse(body);
								
								//var lrc = body.result[0].lrc;
								
								console.log(body.count);
								//console.log(body.result[0].lrc);
								//console.log(util.inspect(body.result));
								if (body.count) {
									requesturl(body.result[0].lrc, function (error, res, bd) {
										if (error) return response.end("Cannot find lyrics.");
										console.log(bd);
										//bd = bd.replace(/ *\[[^]]*\] */g, "");
										return response.end(bd);
									});
								}
									else return response.end("Cannot find lyrics.");
					});
					}
					//response.writeHead(200, {"Content-Type": "text/json"});
					//response.end(JSON.stringify(qs));
					
				break;
					
				case path == "/search":
					
					response.writeHead(200, {"Content-Type": "text/json"});
					//console.log('qs');
					if (qs.q) {
							requesturl('https://itunes.apple.com/search?term=' + qs.q + '&entity=song', function (error, res, body) {
								if (error) return response.end("Search Error.");
								//response.end(body);
									else {
										
										body = JSON.parse(body);
										console.log(util.inspect(body.results));
										
										
										for (var j=0; j < body.results.length; j++) {
											body.results[j] = {  //get rid of unused data to shorten the API results
																					trackId: body.results[j].trackId,
																					trackName: body.results[j].trackName,
																					artistName: body.results[j].artistName,
																					collectionName: body.results[j].collectionName,
																					artworkUrl100: body.results[j].artworkUrl100,
																					previewUrl: body.results[j].previewUrl
																				};
										}
									response.end(JSON.stringify(body));
									}
					});
					}
					//response.writeHead(200, {"Content-Type": "text/json"});
					//response.end(JSON.stringify(qs));
					
				break;
				
				case path == "/":
					sendFileContent(response, mPath + "search.html", "text/html");
				break;
				
				case /^\/[a-zA-Z0-9\/]*.css$/.test(path):
					sendFileContent(response, mPath + path.substring(1), "text/css");
				break;
					
				case /^\/[a-zA-Z0-9\/]*.js$/.test(path):
					sendFileContent(response, mPath + path.substring(1), "text/javascript");
				break;
					
				case /^\/[a-zA-Z0-9\/]*.html$/.test(path):
					sendFileContent(response, mPath + path.substring(1), "text/html");
				break;
					
				case /^\/[a-zA-Z0-9\/]*.png$/.test(path):
					sendFileContent(response, mPath + path.substring(1), "image/png");
				break;

				case /^\/[a-zA-Z0-9\/]*.gif$/.test(path):
					sendFileContent(response, mPath + path.substring(1), "image/gif");
				break;
					
				case /^\/[a-zA-Z0-9\/]*.ico$/.test(path):
					sendFileContent(response, mPath + path.substring(1), "image/x-icon");
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
					
				case "/fav":
					
					request.on("end", function() {
						var user = qstring.parse(formData);
						var qry = {username: user.username, password: user.password};
						
						User.findOne(qry, function(err, doc) {
							if (doc) {
								
									var tempFav = [], 
											tempLength = doc.favourites.length,
											tempCount = tempLength;

									var mC = function(c) {
										if (c < 1) {
											response.writeHead(200, {"Content-Type": "text/json"});
											response.end(JSON.stringify(tempFav));
										}
									};
								
									var mD = function(n) {
										var query = {trackId: doc.favourites[n]};
										TrackDB.findOne(query, function(err, data) {
											console.log(util.inspect(data));
											console.log('count = ' + n);
											
											tempFav[n] = data;
											mC(--tempCount);
										});
									};
								
									if (tempLength) {
											for (var i=0; i<tempLength; i++) {
													mD(i);
											}
									}
									else {
											response.writeHead(200, {"Content-Type": "text/json"});
											response.end(JSON.stringify({}));
									}

							} else {
								response.end('error!');
							}
						});

					});
					
				break;
					
				case "/add":
					
					request.on("end", function() {
						var user = qstring.parse(formData);
						var qry = {username: user.username, password: user.password};

						User.findOne(qry, function(err, doc) {
							if (doc) {
								var arr = doc.favourites;
								var mmp = arr.indexOf(user.add);
								if (mmp == -1) {
									arr.push(user.add);
									var udt = {favourites:arr};

									User.findOneAndUpdate(qry, udt, {upsert:true}, function(errr, doct){
											if (errr) response.end(500, { error: errr });

											else {

											response.writeHead(200, {"Content-Type": "text/json"});
											response.end(JSON.stringify(doct));
												console.log(util.inspect(doct, false, null));
											}
									});

								}

							} else {
								response.end('error!');
							}
						});

					});
					
				break;
					
				case "/auto":
					
					User.findOne({username:'eric'}, function(err, doc) {
						response.writeHead(200, {"Content-Type": "text/json"});
						response.end(JSON.stringify(doc));
					});
					
				break;
				
			}
			
		break;
		
		// Modify existing entries
			
		case "PUT":
			
			formData = '';
      request.on("data", function(data) {
        return formData += data;
      });
			
			response.writeHead(200, {"Content-Type": "text/json"});
			
			request.on("end", function() {
				var user = qstring.parse(formData);
				var qry = {username: user.username, password: user.password};
				
				User.findOne(qry, function(err, doc) {
					if (doc) {
						var arr = doc.favourites;
						var mmp = arr.indexOf(user.add);
						if (mmp == -1) {
							//arr.push(user.add);
							//var udt = {favourites:arr};
							
							doc.favourites.push(user.add);
							doc.save(function(errr, doct){
									if (errr) response.end(500, { error: errr });
								
									else {
										response.end(JSON.stringify(doct));
										console.log(util.inspect(doct, false, null));
									}
							});
							
							var qry = {trackId:user.add};
							
							TrackDB.findOne(qry, function(err, doc) {
								if (err || !(doc)) {
									console.log('finding track on apple');
									requesturl('https://itunes.apple.com/lookup?id=' + user.add.toString(), function (error, res, body) {
												if (error) { //response.end(500, { error: error });
													console.log('lookup error.');
												}
												//response.end(body);
												//body = JSON.parse(body);
												console.log(util.inspect(body));
												body = body.replace('/\n/g', '');
												body = JSON.parse(body);
												console.log(body.resultCount);

												if (body.resultCount) {
													var results = body.results[0];
													console.log(util.inspect(results));
													
													var TK = new TrackDB({trackId:results.trackId, trackName:results.trackName, 
																										artistName:results.artistName, collectionName: results.collectionName,
																										artworkUrl100: results.artworkUrl100, 
																										previewUrl: results.previewUrl, likes: 1});
													
													console.log('newTrack established');
													
													TK.save(function(err, doc) {
													
														if (err) console.log('error');
														else console.log('new record');
													});
												}

									});

								}
								else {
									//console.log('already have in trackDB');
									doc.likes++;
									doc.save(function() {
										console.log('already have in trackDB, +1');
									});
								}
							});

						}
						
					} else {
						response.end('error!');
					}
				});

			});
			
		break;
			
		case "DELETE":
		
			formData = '';
      request.on("data", function(data) {
        return formData += data;
      });
			
			request.on("end", function() {
				var user = qstring.parse(formData);
				var qry = {username: user.username, password: user.password};
				
				User.findOne(qry, function(err, doc) {
					if (doc) {
						//var arr = doc.favourites;
						var mmp = doc.favourites.indexOf(user.rm);
						if (mmp > -1) {
							doc.favourites.splice(mmp, 1);
							
							doc.save(function(err, dt) {
									response.writeHead(200, {"Content-Type": "text/json"});
									response.end(JSON.stringify(dt));
							});
							
							console.log(util.inspect(doc));
							
							TrackDB.findOne({trackId: user.rm}, function(err, dc) {
								dc.likes--;
								if (doc.likes < 0) doc.likes = 0;
								dc.save();
								console.log(util.inspect(dc));
							});
							
						}
						
					} else {
								response.end('error!');
							}
				});

			});			
			
			
		break;
			
		default:
			
	}
	
	}).listen(5000);



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
								"Content-Type": "text/json"
							});
							
							if (doc) //return response.end("Name:" + doc.username + "\n" + doc.name + "\n" + doc.password + ".....");
								return response.end(JSON.stringify(doc));
							
							else
								return response.end(JSON.stringify({login:'fail'}));
						}
					});
					
				break;
					
				case "register":
					
				
					 var newReg = new User({username: option.data.username,
																	email: option.data.email,
																	fullname: option.data.fullname,
																	password: Math.floor(Math.random() * 900000) + 100000
																	// password: 111111 // for testing purpose
																	});
					//var newReg = new User({username: 'may', name: 'May Li', password: '111111'});
					
						newReg.save(function(err, doc){
							if(err) { 
								console.log(err);
								response.writeHead(200, {'Content-Type': 'text/json'});
								response.end(JSON.stringify({Reg:'FAIL'}));
							}
							else {
								console.log(doc.username + ' saved');
								response.writeHead(200, {'Content-Type': 'text/json'});
								response.end(JSON.stringify({Reg:'OK'}));
								
								var message = {
										from: 'eric.305cde@gmail.com',
										//to: 'tetris.hk@gmail.com', //for testing purpose
										to: option.data.email,
										subject: 'Welcome to 305CDE Music Channel',
										text: 'Thank you for your registration. Now you can login at:\n' + ourURL +
													'\n\nYour username:' + newReg.username + '\nYour password: ' + newReg.password
										//html: '<p>HTML version of the message</p>'
								};
								
								console.log(newReg.username);

								transporter.sendMail(message, function(err) {

									if (err) {
										console.log(err);

									}

									else {
										console.log('mail sent.');
										return;
									}
								});
								
							}
						});

				break;
					
			}
		
	//});
	
	//console.log(option.way + '\n' + option.data.password);
	
	//return "haha";
}

function checkPW (username, password) {
						User.findOne({username:username, password:password}, function(err, doc){
						if(err) {
							console.log(err);
							return response.end("server error");
						}
						else {
							
							console.log(util.inspect(doc, false, null));
							
							if (doc) //return response.end("Name:" + doc.username + "\n" + doc.name + "\n" + doc.password + ".....");
								return true;
							
							else
								return false;
						}
					});
}