var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var qs = require('querystring');
var mimeTypes = {
           "html": "text/html",
           "jpeg": "image/jpeg",
           "jpg": "image/jpeg",
           "png": "image/png",
           "js": "text/javascript",
           "css": "text/css"};
var databaseUrl = "test"; 
var collections = ["testData"]
//var db = require("mongojs").connect(databaseUrl, collections);
var mongojs = require('mongojs');
var db = mongojs('databaseUrl', collections);


var server = http.createServer(function onRequest(request, response) {
       var urlParts = url.parse(request.url);
       var fullPath = urlParts.pathname;
       //var page = 'pages' + urlParts.pathname;
  var page = './' + urlParts.pathname;
  console.log(fullPath);
       var jsonUserOject = '';
       if (fullPath == "/post") {
         console.log("post call");
            var userName = '';
               request.on('data', function(chunk) {
               jsonUserObject = JSON.parse(chunk.toString());
               userName = jsonUserObject.name;
               userEmail = jsonUserObject.email;
               db.testData.insert({name: userName, email: userEmail}, function(err, testData) {
                   if( err || !testData) console.log("Unable to add user");
                   });
               });
       }
    var mimeType = mimeTypes[path.extname(page).split(".")[1]];
    fs.exists(page, function fileExists(exists) {
              if (exists) {
                   response.writeHead(200, mimeType);
                   fs.createReadStream(page).pipe(response);
              } else {
                   response.write('Page Not Found');
                   response.end();
              }
    });
}).listen(3300);