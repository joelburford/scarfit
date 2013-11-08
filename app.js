//
// Module dependencies.
//
var express = require("express");
var app = express();

require('./routes.js')(app);
require('./config')(app);
/*app.listen(port, function() {
  console.log("Listening on " + port);
});*/

module.exports = app;


/*
app = express();


#
# Configure
#
require('./config')(app)

# 
# Routes
# 
require('./routes')(app)


module.exports = app

*/