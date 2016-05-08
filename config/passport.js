var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'zid'
  },
  function(zid, password, done) {
    
    User.findOne({ zid: zid }, function (err, user) {
      if (err) { return done(err); }
   
      if (!user) {
        return done(null, false, { message: 'User does not exist' });
      }
   
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password' });
      }
   
      return done(null, user);
    });
}));