var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
		username:{type: String, unique: true}, 
		email:{type: String, unique: true},
		fullname: String,
		password: String,
		favourites: [String],
		regDate: Date
	}, 
		{collection: "accounts"}
	);

	mongoose.connect('mongodb://localhost/mydb');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));

  var User = mongoose.model('accounts', userSchema);

	var qry = {username:'eric', password:'123456'};

	var udt = {favourites: ['2222222', '3333333']};


						User.findOneAndUpdate(qry, udt, {upsert:true}, function(err, doc){
								if (err) console.log(err);
								console.log("succesfully updated");
						});