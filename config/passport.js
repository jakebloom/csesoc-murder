var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var unsw = require('unsw-ldap');

passport.use(new LocalStrategy({
    usernameField: 'zid'
  },

  function(zid, password, done) {
    User.findOne({ zid: zid }, function (err, user) {
      if (err) { return done(err); }
   
      if (!user) {
        return done(null, false, { message: 'User does not exist' });
      }
   
      unsw.getUserName(zid, password).then(
        function(){
          return done(null, user);
        },
        function(){
          return done(null, false, { message: 'Incorrect password' });
        }
      )
    });
}));