var UserModule = require('../modules/user_module');

exports.signup = function(req, res) {
		res.render('signup', {
			title : 'Sign Up',
		});

};

exports.signupPost = function(req, res){
	var email = req.param("email");
	console.log("POST to /signup, email: " + email);
	var pass = req.param("pass");

	var user = {
		email: email,
		pass: pass
	};

	UserModule.addNewUser(user, function(e){
		if (typeof e === 'undefined') {
			//User created successfully, log in
			console.log("User added successfully");
			res.redirect("/")
		} else {
			console.log(e);

			//DEAL WITH THIS BETTER!  Display error message and redirect to signup.
			res.send(e);
		}
	});

	/*
		UM.addNewAccount {
		email 	: req.body.email,
		pass	: req.body.pass,
	}, 

	(e) ->
		if e
			console.log "ERROR sending email"
			console.log JSON.stringify(e)
			res.send e, 400
		else
			UM.getConfirmKey req.body.email, (key) ->
				EM.dispatchNewUser req.body.email, key, (e) ->
					#
				if e
					console.log JSON.stringify(e)
				console.log "Sending email to " + req.body.email + 
				req.session.user = req.body.email
				#if req.param('remember-me') == 'true'
				res.cookie 'user', req.body.email, { maxAge: 900000 }
				res.cookie 'pass', req.body.password, { maxAge: 900000 }
				
				#res.send user, 200
				#log user in, refresh page
				res.redirect '/'
				*/
};

/*
CT = require '../helpers/country_list'
EM = require '../helpers/email_dispatcher'

exports.handle_incoming = (req, res) ->
	# check if the user's credentials are saved in a cookie
	if req.cookies.user == undefined || req.cookies.pass == undefined
		res.redirect '/', { title: 'Sportster - Please Login' }
	else
		# attempt automatic login
		UM.autoLogin req.cookies.user, req.cookies.pass, (user) ->
			if user != null
				req.session.user = user
				res.redirect '/'
			else
				res.redirect '/'

exports.confirmUserFromEmail = (req, res) ->
	#query users using email, get db key
	#if no user or key wrong, error
	#else update user confirmed
	UM.getConfirmKey req.params.email, (confKey) ->
		email = decodeURIComponent req.params.email
		key = decodeURIComponent req.params.key

		if confKey
			console.log "DB CONF KEY" + confKey
			if confKey == key
				UM.confirmUser email, (success)->
					if success
						res.redirect '/'
					else
						console.log "ERROR: user.coffee - CONFIRM FAIL FOR" + email
						res.redirect '/'
			else
				console.log "ERROR: user.coffee - CONF KEYS DO NOT MATCH FOR " + email
				res.redirect '/'
		else
			console.log "ERROR: user.coffee - NO CONF KEY FOUND FOR " + email
			res.redirect '/'

exports.confirmUserFromForm = (req, res) ->
	email = req.session.user
	key = req.param('confkey')
	UM.getConfirmKey email, (confKey) ->

		if confKey
			if confKey == key
				UM.confirmUser email, (success)->
					if success
						res.redirect '/'
					else
						console.log "ERROR: user.coffee - CONFIRM FAIL FOR" + email
						res.redirect '/'
			else
				console.log "ERROR: user.coffee - CONF KEYS DO NOT MATCH FOR " + email
				res.redirect '/'
		else
			console.log "ERROR: user.coffee - NO CONF KEY FOUND FOR " + email
			res.redirect '/'


exports.submitHype = (req, res) ->
	name = req.body.name
	hypelink = req.body.hype

	UM.getAccountByEmail req.session.user, (data) ->
		id = data.rows[0].id

		UM.deleteHype id, () ->
			#if hype exists, delete it
			console.log "Submitting Hype:" + id + " " + name + " " + hypelink
			UM.submitHype id, name, hypelink, (e) ->
				res.redirect '/'


exports.loggedIn = () ->

	#Ughghghghg  is this even right, should it be here? @joel @todo
	#logic needed for front page
	if req.session.user
		return true
	else
		return false
		# ...

#Used if a user attempts to visit a url with cookies enabled
#Allowing them to go right where they want
exports.validate_user = (user,pass) ->
	if req.cookies.user && req.cookies.pass
		UM.autoLogin req.cookies.user, req.cookies.pass, (user) ->
			if user != null
				req.session.user = user
				return true
			else
				return false
		
exports.login = (req, res) ->
	if req.param('email') && req.param('pass')

		UM.manualLogin req.param('email'), req.param('pass'), (e, user) ->
			if !user
				res.send(e, 400)
			else
				req.session.user = user.rows[0].email
				#if req.param('remember-me') == 'true'
				res.cookie 'user', user.rows[0].email, { maxAge: 900000 }
				res.cookie 'pass', user.rows[0].pass, { maxAge: 900000 }
				
				res.redirect "/"

#GET: Call this to edit a user
exports.edit_user = (req, res) ->
	res.render 'user/edit_account', {
		title : 'Update Account',
		countries : CT,
		udata : req.session.user
	}

exports.manage_user = (req, res) ->

	UM.getAccountByUsername req.params.username, (e, user) ->
		res.render 'user/edit_account', {
			title : 'Manage Account',
			countries : CT,
			udata : user
		}

exports.show_home = (req, res) ->
	if req.session.user == null 
		# if user is not logged-in redirect back to login page #
		res.redirect '/'
	else
		res.render 'home', {
			title : 'Control Panel',
			countries : CT,
			udata : req.session.user
		}

#POST: Called after edit user submission
exports.update_user = (req, res) ->
	if req.param('user') != undefined
		UM.updateAccount {
			user 		: req.param('user'),
			name 		: req.param('name'),
			email 		: req.param('email'),
			country 	: req.param('country'),
			pass		: req.param('pass')
		}, (e, user) -> 
			if e
				res.send 'error-updating-account', 400
			else
				req.session.user = user;
				
				# update the user's login cookies if they exists
				if req.cookies.user != undefined && req.cookies.pass != undefined
					res.cookie 'user', o.user, { maxAge: 900000 }
					res.cookie 'pass', o.pass, { maxAge: 900000 }
				
				res.send 'ok', 200
			
	else if req.param('logout') == 'true'
		res.clearCookie 'user'
		res.clearCookie 'pass'
		req.session.destroy (e) -> 
			res.send 'ok', 200

exports.logout = (req,res) ->
	res.clearCookie 'user'
	res.clearCookie 'pass'

	req.session.destroy (e) -> 
		res.send 'ok', 200 

	res.redirect '/'

exports.signup = (req, res) ->
	UM.addNewAccount {
		email 	: req.body.email,
		pass	: req.body.pass,
	}, 

	(e) ->
		if e
			console.log "ERROR sending email"
			console.log JSON.stringify(e)
			res.send e, 400
		else
			UM.getConfirmKey req.body.email, (key) ->
				EM.dispatchNewUser req.body.email, key, (e) ->
					#
				if e
					console.log JSON.stringify(e)
				console.log "Sending email to " + req.body.email + 
				req.session.user = req.body.email
				#if req.param('remember-me') == 'true'
				res.cookie 'user', req.body.email, { maxAge: 900000 }
				res.cookie 'pass', req.body.password, { maxAge: 900000 }
				
				#res.send user, 200
				#log user in, refresh page
				res.redirect '/'

create_user = (req, res) ->
	UM.addNewAccount {
		email 	: req.param('email'),
		pass	: req.param('pass'),
	}, 

	(e) ->
		if e
			res.send e, 400
		else
			#set session?
			res.send 'ok', 200

exports.lost_password = (req, res) ->
	# look up the user's account via their email #
	UM.getAccountByEmail req.param('email'), (user) ->
		if user
			res.send 'ok', 200 
			EM.dispatchResetPasswordLink user, (e, m) ->
				# this callback takes a moment to return #
				# should add an ajax loader to give user feedback #
					if !e
						#res.send('ok', 200);
					else
						res.send 'email-server-error', 400
						for k in e
							console.log 'error : ', k, e[k]
					
		else
			res.send 'email-not-found', 400

exports.reset_password = (req, res) ->
	email = req.query["e"]
	passH = req.query["p"]

	UM.validateResetLink email, passH, (e) ->
		if e != 'ok'
			res.redirect '/'
		else
			# save the user's email in a session instead of sending to the client #
			req.session.reset = { email:email, passHash:passH }
			res.render 'user/reset', { title : 'Reset Password' }

exports.save_reset_password = (req, res) ->
	nPass = req.param 'pass'
	# retrieve the user's email from the session to lookup their account and reset password #
	email = req.session.reset.email
	# destory the session immediately after retrieving the stored email #
	req.session.destroy()
	UM.updatePassword email, nPass, (user) ->
		if user
			res.send 'ok', 200
		else
			res.send 'unable to update password', 400
		
exports.list_users = (req, res) ->
	UM.getAllRecords (e, accounts) ->
		res.render 'user/users', { title : 'Account List', accts : accounts }

exports.delete_user = (req, res) ->
	UM.deleteAccount req.body.id, (e, obj) ->
		if !e
			res.clearCookie('user')
			res.clearCookie('pass')
			req.session.destroy (e) ->
				res.send('ok', 200)
		else
			res.send 'record not found', 400

*/