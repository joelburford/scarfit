var express = require('express');
var path = require('path');
//fs = require 'fs'
//url = require 'url'

var config = function(app) {

  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  //app.use(express.logger());


  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.methodOverride());// Allows the use of HTTP 'DELETE' AND 'PUT' methods.
  app.use(express.cookieParser('1234567890QWERTY'));
  app.use(express.session({secret: '1234567890QWERTY'}));
  ///app.use(express.logger(loggingOptions));
/*

  # Production
  #
  if 'production' == app.get('env')

    console.log "Using production config"
    # # create the logs dir if it isn't there already
    # fs.mkdir '/mnt/log'

    # Open the stream to the log file.
    # logfile = fs.createWriteStream logPath, {flags: 'a'} 

    loggingOptions = 
      format: 'default'
      # stream: logfile

  # 
  # Configuration
  # 
  

  # We only want to serve https so we redirect any http traffic to https.
  # On development the function is empty so that the redirect doesn't happen.
  # app.use httpsRedirect

  # Auto compile LESS. Will detect changes when developing
  app.use lessCompiler(lessCompilerOptions)

  # Compress the files we serve with Gzip
  app.use express.compress()

  # Add far future expires headers
  app.use farFutureExpiresHeaders()

  # Static files serving
  app.use express.static(path.join(__dirname, '/public'))
  app.use app.router
  app.use express.errorHandler()

  #app.use(function(err, req, res, next){
  #console.error(err.stack);
  #res.send(500, 'Something broke!');
  # });
*/
};

module.exports = config;