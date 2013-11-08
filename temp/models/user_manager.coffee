crypto 		= require('crypto')
moment 		= require('moment')

#Establish MongoDB Connection and Get DB Accessort
db_connector = require('../helpers/db_connector')
db = db_connector.start_session()

# ######SCHEMA###########
# 	Table: users

#CREATE TABLE users (
#	id SERIAL PRIMARY KEY,
#	username varchar(40),
# 	email varchar(40) NOT NULL,
#	country varchar(25),
#	pass varchar(256),
#	date_join date,
#   isAdmin boolean 
#);

exports.submitHype = (id, name, url, callback) ->
	db.query "INSERT INTO hype(mc_name, user_id, link, date_sub, accepted) VALUES($1, $2, $3, $4, FALSE)",
					[name, id, url, new Date()], (e, res) ->
						if e
							callback e
						else callback res.rows

exports.deleteHype = (uid, callback) ->
	db.query "DELETE FROM hype WHERE user_id = $1", [uid], callback

# #####################/

# get a list of competing MCs
exports.getApprovedHypes = (mainres, mainreq, callback) ->
	#move this to a hype or something?  submission manager?
	#add  WHERE accepted = true   when accepted functionality is in
	db.query "SELECT link, mc_name FROM hype", (e, res) ->
	 	if e
	 		callback e
	 	else
	 		callback mainres, mainreq, res.rows

    # return [
    #         {name:'bob', hype:'http://www.google.com'}, 
    #         {name:'Lou', hype:'http://www.hotmail.com'},
    #                     {name:'bob', hype:'http://www.google.com'}]
# login validation methods
exports.getConfirmKey = (email, callback) ->
	db.query "SELECT * FROM users WHERE email = $1 LIMIT 1", [email], (e, user) ->
		if user
			callback user.rows[0].confirm_key
		else
			callback null	

exports.isConfirmed = (email, callback) ->
	db.query "SELECT * FROM users WHERE email = $1 LIMIT 1", [email], (e, user) ->
		if user
			if user.rows[0].email_confirmed == true
				callback true
			else
				callback null
		else
			callback null

exports.confirmUser = (email, callback) ->
	db.query "UPDATE users SET email_confirmed = TRUE WHERE email = $1", 
				[email], (e) ->
					if e
						console.log(JSON.stringify e)
						callback null
					else
						callback true
exports.autoLogin = (user, pass, callback) ->

	db.query "SELECT * FROM users WHERE user = $1 LIMIT 1", [user], (e, user) ->
		if user
			if user.pass == pass
				callback user
			else
				callback null
		else
			callback null


exports.manualLogin = (email, pass, callback) ->
	if !email or !pass
		callback 'error'
	db.query "SELECT * FROM users WHERE email = $1 LIMIT 1", [email], (e, data) ->
		if data == null
			#PROBABLY INCORRECT LOGIC
			callback 'user-not-found'
		else
			validatePassword pass, data.rows[0].pass, (err, res) ->
				if res
					callback null, data
				else 
					callback 'invalid-password'

# record insertion, update & deletion methods

exports.addNewAccount = (newData, callback) ->
	#	db.query "SELECT * FROM users WHERE user = $1 LIMIT 1", [newData.user], (e, user) ->
	#		if user
	#			callback 'username-taken'
	db.query "SELECT * FROM users WHERE email = $1 LIMIT 1", [newData.email], (e, email) ->
		if email.rowCount != 0
			callback 'email-taken'
		else
			confirm = generateConfKey (confirm) ->
				saltAndHash newData.pass, (hash) ->
					newData.pass = hash
					# append date stamp when record was created #
					#newData.created = moment().format('MMMM Do YYYY, h:mm:ss a');
					#create user insert query
					console.log newData.email + " : " + newData.pass + " : " + confirm
					db.query "INSERT INTO users(email, pass, confirm_key, date_join, isAdmin) values($1, $2, $3, $4, FALSE)", 
						[newData.email, newData.pass, confirm, new Date()], callback

exports.updateAccount = (newData, callback) ->

	if newData.pass == ''
		db.query "UPDATE users SET name, email, country WHERE id = $1", 
			[newData.name, newData.email, newData.country, newData.id], callback
	else
		saltAndHash newData.pass, (hash) ->
			newData.pass = hash;
			db.query "UPDATE users SET name = $1, email = $2, country = $3, pass = $4 WHERE id = $5", 
				[newData.name, newData.email, newData.country, newData.pass, newData.id], callback

exports.updatePassword = (email, newPass, callback) ->

	saltAndHash newPass, (hash) ->
		db.query "UPDATE users SET pass = $1 WHERE email = $2", [newPass,email], callback	


# account lookup methods */

exports.deleteAccount = (id, callback) ->

	db.query "DELETE FROM users WHERE id = $1", [id], callback


exports.getAccountByEmail = (email, callback) ->

	db.query "SELECT * FROM users WHERE email = $1", [email],  (e, user) -> 
		callback user

exports.getAccountByUsername = (username, callback) ->

	db.query "SELECT * FROM users WHERE user = $1", [username], (e,user) ->
		callback null, user

exports.validateResetLink = (email, passHash, callback) ->
	
	db.query "SELECT * FROM users WHERE email = $1, pass = $2", [email, passHash], (e, user) ->
		callback user ? 'ok' : null


exports.getAllRecords = (callback) ->
	
	db.query "SELECT * FROM users", (e, res) ->
		if e
			callback e
		else
			# callback(null, res);
			res.toArray callback


exports.delAllRecords = (callback) ->

	# reset accounts collection for testing #
	db.query "DELETE FROM users", callback 

# private encryption & validation methods */

generateSalt = () ->
	
	set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ'
	salt = ''
	for i in [0..10] by 1
		p = Math.floor Math.random() * set.length
		salt += set[p]
	
	return salt

generateConfKey = (callback) ->
	
	set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ'
	salt = ''
	for i in [0..10] by 1
		p = Math.floor Math.random() * set.length
		salt += set[p]

	callback salt

md5 = (str) ->

	return crypto.createHash('md5').update(str).digest('hex')


saltAndHash = (pass, callback) ->
	salt = generateSalt()
	callback salt + md5(pass + salt)


validatePassword = (plainPass, hashedPass, callback) ->
	salt = hashedPass.substr(0, 11)
	validHash = salt + md5(plainPass + salt)
	callback null, hashedPass == validHash

# auxiliary methods */

findById = (id, callback) ->

	db.query "SELECT * FROM users WHERE id = $1", [id], (error, res) ->
		return res
