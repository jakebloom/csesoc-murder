var express = require('express');
var router = express.Router();

var fs = require('fs');

var jwt = require('express-jwt');

var mongoose = require('mongoose');
var User = mongoose.model('User');

var auth = jwt({secret: process.env.MURDER_SECRET, userProperty: 'payload'});

router.get('/assign', auth, function(req, res, next){
	var username = req.payload.username;

	User.findOne({'username': username}).exec(function(err, current_user){
		if (err){return next(err);}
		if (!current_user.admin){
			return res.status(401).json({message: "You are not an admin"});
		}

		User.find({}).exec(function(err, users){
			if (err){return next(err);}

			fs.readFile('words.txt', function(err, data){
				if (err){return next(err);}

				var lines = data.toString('utf-8').split('\n');
				users.forEach(function(user){
					user.codeword = lines[Math.floor(Math.random() * lines.length)];
					user.save(function(err){
						if (err){return next(err);}
					});
				})
			});
		});
	});

});

router.get('/start', auth, function(req, res, next){
	var username = req.payload.username;

	User.findOne({'username': username}).exec(function(err, current_user){
		if (err){return next(err);}
		if (!current_user.admin){
			return res.status(401).json({message: "You are not an admin"});
		}

		//assign targets here
	});
});

module.exports = router;