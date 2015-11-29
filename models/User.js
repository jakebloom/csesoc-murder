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

mongoose.model('User', UserSchema);