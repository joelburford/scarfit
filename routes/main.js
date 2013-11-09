//UM = require '../models/user_manager'
/*
# request = require 'request'
# user = 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0'
# domain  = 'clabtrap.mailgun.org'
# url = 'https://' + user + '@api.mailgun.net/v2/' + domain + '/messages'
# console.log url
# form = { 
#     from: 'Excited User <me@app13121298.mailgun.org>',
#     to: 'joelburford@gmail.com',
#     subject: 'Hello',
#     text: 'Testing some Mailgun awesomness!'
#    } 
# request.post url, {form:form}, (error, response, body) -> 
#     console.log "LASDLDS"
#     if response
#         console.log response
#     if error
#         console.log error

#     if (!error && response.statusCode == 200)
#         console.log body
*/
exports.index = function (req, res){
        res.render ('index', {title: 'Scarf It'});
};