var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
//fs.readFile('./dbajax.html', function (err, html) 
//{
    //if (err) throw err; 

    http.createServer(function (request,response)
    {  
        // serve site
        if (request.url === "/")
        {
            response.writeHeader(200, {"Content-Type": "text/html"});  
            response.write(html);  
        }
      if (request.url === "/db")
        {
           console.log("db");
            MongoClient.connect("mongodb://localhost:27017/mydb", function (err, db) {
    
           db.collection('handle', function (err, collection) {
        
         collection.find().toArray(function(err, items) {
            if(err) throw err;    
            console.log(items);    
            response.writeHead(200, {"Content-Type:": "application/json"}); 
var submittedPost = {};
//submittedPost['message'] = 'Proof that Node and Mongo are working..';
//response.write( "_wrapper('" );
response.write( JSON.stringify(items) );
//response.write(items);
//response.write( "')");              
response.end();
        });
        
    });
                
}); 
        }
      if (request.url === "/dbcall"){
         console.log("dbcall");
        fs.readFile('./dbajax.html', function (err, html) 
          {
            //response.writeHeader(200, {"Content-Type": "text/html"});  
           response.write(html);  
           response.end();
        }
                    )
        

      }
        //response.end(); 
    }).listen(9001); 
//});