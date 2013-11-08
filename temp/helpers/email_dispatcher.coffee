
ES = require './email_settings'
EM = {}
module.exports = EM


nodemailer = require("nodemailer");
smtpTransport = nodemailer.createTransport "SMTP", {
    service: "Mailgun",
    auth: {
        user: "postmaster@clabtrap.mailgun.org",
        pass: "88h5zb-354u4"
        api: 'key-2dyinx22fuund8mvob1vwzh49fmn1vh7'
    }
}

EM.server = require("emailjs/email").server.connect({

	host 	    : ES.host,
	user 	    : ES.user,
	password    : ES.password,
	ssl		    : true

})

EM.dispatchResetPasswordLink = (account, callback) ->

	EM.server.send({
		from         : ES.sender,
		to           : account.email,
		subject      : 'Password Reset',
		text         : 'something went wrong... :(',
		attachment   : EM.composeResetPassword(account)
	}, callback )

EM.composeResetPassword = (o) ->

	link = 'http://clabtrapapp.com/reset-password?e='+o.email+'&p='+o.pass

	html = "<html><body>"
	html += "Hi "+o.name+",<br><br>"
	html += "Your username is :: <b>"+o.user+"</b><br><br>"
	html += "<a href='"+link+"'>Please click here to reset your password</a><br><br>"
	html += "Cheers,<br>"
	html += "<a href='http://twitter.com/clabtrap'>Clabtrap</a><br><br>"
	html += "</body></html>"

	return  [{data:html, alternative:true}]


EM.dispatchNewUser = (email, key, callback) ->

	mailOptions = {
	  from: ES.sender,
	  to: email,
	  subject: "Confirmation",
	  text: "To confirm your account login to Clabtrap.com, then copy the following confirmation code: " + key
	  html: EM.composeWelcomeUser(email, key)
	}

	smtpTransport.sendMail mailOptions, (err, res) ->
	  if (err) 
	    console.log(err)
	  console.log('Email Success')
	#UM get confirm key
	#say hello to our new user
	# EM.server.send({
	# 	from         : ES.sender,
	# 	to           : email,
	# 	subject      : 'clabtrap',
	# 	text         : 'BUTTHOLE'
	# 	#attachment   : EM.composeWelcomeUser(email, key)
	# }, (err, message) ->
	# 	console.log(err || message)
	# 	callback())

	#notify us that we have a new user
	#EM.server.send({
#		from         : ES.sender,
#		to           : ES.contact,
#		subject      : 'New User Signup!',
#		text         : '',
#		attachment   : EM.composeNewUserNotify(account)
#	}, callback )


EM.composeWelcomeUser = (email, key) ->

	html = "<html><body>"
	html += "<b>Welcome to Clabtrap.com</b><br><br>"
	html += "<p>Before you can battle you must confirm your email.<p>"
	html += "<p>Click dis: <a href=\"http://www.clabtrap.com/confirm/"
	html += encodeURIComponent(email) + "/"+ encodeURIComponent(key)
	html += "\">Confirm Email</a></p>"
	html += "<p>Or go to <a href=\"http://www.clabtrap.com\">Clabtrap</a>, log in, and past dis: "+key+"</p>"
	html += "<a href='http://twitter.com/clabtrap'>@clabtrap</a><br />"
	html += "<a href='mailto:" + ES.support + "'>" + ES.support + "</a></br></br>"
	html += "</body></html>"

	return  html

EM.composeNewUserNotify = (o) ->

	html = "<html><body>"
	html += "We've got a new user, "+o.name+" woot!</b><br><br>"
	html += "<p>Lets keep up the good work.</p>"
	html += "</body></html>"

	return  [{data:html, alternative:true}]
