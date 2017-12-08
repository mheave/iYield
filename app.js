var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var logger = require('morgan');
var securityCheck = require('./middleware/security')
var registry = require('./routes/registry');
var errorModel = require('./models/errorModel');


var app = express();
app.use(logger('dev'));
app.use(securityCheck("cwc"));
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({ 
  extended: true
})); 
app.use('/registry', registry);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  let errorResponse = errorModel(req.path, err.message, err);

  res.json(errorResponse);
});

module.exports = app;
