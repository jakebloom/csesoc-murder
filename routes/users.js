var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');
var mongoose = require('mongoose');

var User = mongoose.model('User');
var auth = jwt({secret: process.env.MURDER_SECRET, userProperty: 'payload'});
/* GET users listing. Remove this soon.*/
router.get('/', function(req, res, next) {
  
	User.find(function(err, users){
		if (err) {return next(err);}

		res.json(users);
	});
});

/* view yourself */
router.get('/me', auth, function(req, res, next){
	var username = req.payload.username;
	User.findOne({'username': username}, function(err, user){
		if (err){return err;}

		return res.json(user);
	});
});

/* create a new user */
router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.username = req.body.username;

  user.setPassword(req.body.password)

  user.save(function (err){
    if(err){ return next(err); }

    return res.json({token: user.generateJWT()})
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
