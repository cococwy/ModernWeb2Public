var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoose opened!');
  var userSchema = new mongoose.Schema({
      username:{type: String, unique: true}, 
      name:{type: String, unique: true}, 
      password:String
    }, 
    {collection: "handle"}
    );
  var User = mongoose.model('handle', userSchema);

  User.findOne({name:"Eric Too"}, function(err, doc){
    if(err) console.log(err);
    else console.log(doc.name + ", password - " + doc.password);
  });

  var lisi = new User({username:"lisa", name:"LiSi", password:"123456"});
  lisi.save(function(err, doc){
    if(err)console.log(err);
    else console.log(doc.name + ' saved');
  });  
});