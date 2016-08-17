var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var logger = require('morgan');
var compression = require('compression');

//Import user model
require('./models/User');

//Import Kills model
require('./models/Kill')

//Get the passport config
require('./config/passport');

//Connect to database
var mongohost = process.env.NODE_ENV === "production" ? 
              process.env.MONGO_URL : 
              'mongodb://localhost/murder'
mongoose.connect(mongohost);

var routes = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');
var kills = require('./routes/kills');

var app = express();

app.use(compression())
app.use(express.static(__dirname + '/public'));
app.use(logger('combined'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', routes);
app.use('/users', users);
app.use('/admin', admin);
app.use('/kills', kills);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
app.set('env', 'development');
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
	console.log("Running on localhost:" + PORT);
})