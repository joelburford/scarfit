var http = require('http');
var app = require('./app');

/*Global error handling*/
process.on('uncaughtException', function(e) {
  console.log("********* Uncaught Exception *********");
  console.log(e);
});



var port = process.env.PORT || 5000;

/*Start app*/
http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});