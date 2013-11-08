http = require 'http'
app = require './app'

# 
# Global error handling.
# It's not a really good solution there are potential issues
# with it not cleaning things up properly, sockets being left open,
# memory not being deallocated, the process ending up in an undefined state.
# 
# The Node docs recommend against using this technique, but the recommended
# solution (using 'Domains') is still experimental at this point and doesn't
# work as advertised (or at least I couldn't get it to do what I thought it 
# should be doing).
# 
# So this is the first FIXME.
# 
process.on 'uncaughtException', (e) ->
  console.log "********* Uncaught Exception *********"
  console.log e.stack

http.createServer(app).listen app.get('port'), () ->
  console.log "Express server listening on port " + app.get('port')