var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var logger = require('morgan');
var securityCheck = require('./middleware/security')
var errorModel = require('./models/errorModel');

var registryRouter = require('./routes/registryRouter');
var tokenRouter = require('./routes/tokenRouter');
var transactionRouter = require('./routes/transactionRouter');
<<<<<<< HEAD
var EthService =  require('./services/EthService');


=======
const ConfigurationService = require('./services/ConfigurationService');

// Watch for keyfile
var watch = require('node-watch');
watch('keydrop', { recursive: true }, function(evt, name) {

  var fs = require('fs');

  fs.readFile(name, 'utf8', function(err, contents) {

    console.log(contents);
    config.setGlobalSettings({ycAccountPrivateKey : contents});
    fs.unlink(item, function(){});

  });

});
>>>>>>> master


var app = express();
app.use(logger('dev'));
//app.use(securityCheck("cwc"));
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({ 
  extended: true
}));

config = new ConfigurationService();

// Routing
app.use('/', registryRouter);
app.use('/', tokenRouter);
app.use('/', transactionRouter);

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

process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.message);
  console.log('unhandledRejection', error);
});


module.exports = app;
