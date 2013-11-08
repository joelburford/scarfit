#
# Module dependencies.
#

express = require 'express'
app = express()


#
# Configure
#
require('./config')(app)

# 
# Routes
# 
require('./routes')(app)


module.exports = app
