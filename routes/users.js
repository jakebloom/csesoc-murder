var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  
	User.find(function(err, users){
		if (err) {return next(err);}

		res.json(users);
	});
});

/* create a new user */
router.post('/register', function(req, res, next) {
	var user = new User(req.body);

	user.save(function(err, user){
		if (err) {return next(err);}

		res.json(user);
	});
});

module.exports = router;
