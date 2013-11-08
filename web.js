var express = require("express");
var app = express();
var http = require('http');
app.use(express.logger());

require('./routes.js')(app);
//require('./config')(app);

var port = process.env.PORT || 5000;
/*app.listen(port, function() {
  console.log("Listening on " + port);
});*/

http.createServer(app).listen(port, function(){
  console.log("Express server listening on port " + port);
});