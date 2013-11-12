//
// Module dependencies.
//
var express = require("express");
var app = express();

require('./config')(app);
require('./routes')(app);

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