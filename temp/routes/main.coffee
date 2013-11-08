UM = require '../models/user_manager'

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

exports.index = (req, res) ->
    UM.getApprovedHypes(req, res, renderIndex)
    

renderIndex = (req, res, mcs) ->
    if req.session.user
        UM.isConfirmed req.session.user, (confirmed) ->   
            if confirmed 
                if UM.hypeSubmitted
                    res.render 'index', {title: 'CLABTRAP', mcs, loggedIn: true, confirmed: true}
                else
                    res.render 'index', {title: 'CLABTRAP', mcs, loggedIn: true, confirmed: true}
            else
                res.render 'index', {title: 'CLABTRAP', mcs, loggedIn: true, confirmed: null}
    else 
        res.render 'index', {title: 'CLABTRAP', mcs, loggedIn: null, confirmed: null}

exports.clab2013 = (req, res) ->
    res.render '2013'

exports.clab2013mcs = (req, res) ->
    res.render '2013mcs'

exports.clab2013beats = (req, res) ->
    res.render '2013beats'

exports.clab2013voters = (req, res) ->
    res.render '2013voters'