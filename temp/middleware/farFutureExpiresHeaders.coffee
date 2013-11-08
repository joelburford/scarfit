url = require 'url'
moment = require 'moment'

expiresHeaders = (req, res, next) -> 
    pathname = url.parse(req.url).pathname
    if /^.+\.(js|css)$/.test(pathname)
      res.header "Expires", moment().add('years', 1).format("ddd, DD MMM YYYY HH:mm:ss G\\MT")
    next()

module.exports = () ->
  return expiresHeaders