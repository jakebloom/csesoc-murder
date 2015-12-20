var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');
var mongoose = require('mongoose');

var User = mongoose.model('User');
var auth = jwt({secret: process.env.MURDER_SECRET, userProperty: 'payload'});

var passport = require('passport');

/* Get players who are still alive*/
router.get('/alive', function(req, res, next){
	User.find({alive: true}).select('name').exec(function(err, users){
		if (err) {return next(err)};

		return res.json(users);
	})
});

/* view yourself */
router.get('/me', auth, function(req, res, next){
	var username = req.payload.username;
	User.findOne({'username': username}).lean().populate('target', 'name').exec(
		function(err, user){
			if (err){return next(err);}

			return res.json(user);
		}
	);
});

/* Kill your target */
router.post('/kill', auth, function(req, res, next){
	var username = req.payload.username;

	User.findOne({'username': username}).populate('target').exec(function(err, user){
		if (err){return next(err);}
	
		if (!user.target){
			return res.status(400).json({message: "You don't have a target to kill"});
		}

		if (!user.alive){
			return res.status(400).json({message: "You are not a zombie"});
		}

		var target = user.target;

		if (target.codeword != req.body.codeword){
			return res.status(400).json({message: "Incorrect codeword."});
		}

		target.alive = false;
		user.target = target.target;

		target.save(function(err){
			if (err){return next(err);}

			user.save(function(err){
				if (err){return next(err);}

				return res.status(200).json({message: "Target is dead. Press f to pay respects."});
			});
		});

	});

});

/* create a new user */
router.post('/register', function(req, res, next){
	if(!req.body.username || !req.body.password){
		return res.status(400).json({message: 'Please fill out all fields'});
	}

	var user = new User();

	user.username = req.body.username;
	user.name = req.body.name;

	user.setPassword(req.body.password)

	user.save(function (err){
		if(err){ return next(err); }

		return res.json({token: user.generateJWT()});
	});
});

router.post('/login', function(req, res, next){
	if(!req.body.username || !req.body.password){
		return res.status(400).json({message: 'Please fill out all fields'});
	}

	passport.authenticate('local', function(err, user, info){

		if(err){ return next(err); }

		if(user){
			return res.json({token: user.generateJWT()});
		} else {
			return res.status(401).json(info);
		}
	})(req, res, next);
});

module.exports = router;
