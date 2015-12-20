var express = require('express');
var router = express.Router();

var fs = require('fs');

var jwt = require('express-jwt');

var mongoose = require('mongoose');
var User = mongoose.model('User');

var auth = jwt({secret: process.env.MURDER_SECRET, userProperty: 'payload'});


function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex ;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

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
				});
				return res.status(200).json({message: "Codewords assigned successfully"});
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

		User.find({}).exec(function(err, users){
			if (err){return next(err);}
			users = shuffle(users);
			for (var i = 0; i < users.length - 1; i++){
				users[i].alive = true;
				users[i].target = users[i + 1]._id;
				users[i].save(function(err){
					if (err){return err;}
				});
			}
			users[users.length - 1].alive = true;
			users[users.length - 1].target = users[0]._id;
			users[users.length - 1].save(function(err){
				if (err){return err;}
			});
			return res.status(200).json({message: "The game has started"});
		});
	});
});

module.exports = router;