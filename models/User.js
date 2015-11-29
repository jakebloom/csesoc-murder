var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
	name: String,
	username: (type: String, lowercase: true, unique: true},
	hash: String,
	salt: String,
	codeword: String,
	target: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
	alive: { type: Boolean, default: true }
});


UserSchema.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password){
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	return hash === this.hash;
}

//generate a token for authentication
UserSchema.methods.generateJWT = function() {

	//tokens expire in 60 days
	var today = new Date();
	var exp = new Date(today);
	exp.setDate(today.getDate() + 60);

	return jwt.sign({
		_id: this._id,
		username: this.username,
		exp: parseInt(exp.getTime() / 1000)
	}, process.env.MURDER_SECRET);
};

mongoose.model('User', UserSchema);