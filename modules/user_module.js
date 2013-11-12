var crypto 		= require('crypto');
var UserTable = require('../db/table_users');
var UserDetailsTable = require('../db/table_persons');
//moment 		= require('moment')

//#Establish MongoDB Connection and Get DB Accessort
//db_connector = require('../helpers/db_connector')
//db = db_connector.start_session()

//users(user_name,password,date_registered)
//persons(user_name,first_name,last_name,address,email,phone)

function registerUser(username, pass, callback) {
	//confirm username is unique
	//
};

exports.addNewUser = function addNewAccount(user, callback) {
	UserTable.addUser(user, function(e){
		//UserDetailsTable.setDefaults
		//call table_user addnew with user.email and user.pass
		//account creation success
		if(typeof e === 'undefined') {
			callback();
		} else {
			//add user fail
			callback(e);

		}
	});
}

exports.updateUser = function updateAccount(username, pass, firstname, lastname, address, email, phone, callback){
	
}

exports.deleteUser = function deleteUser(username, pass, callback) {

}

/*


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


# account lookup methods

exports.deleteAccount = (id, callback) ->

	db.query "DELETE FROM users WHERE id = $1", [id], callback


exports.getAccountByEmail = (email, callback) ->

	db.query "SELECT * FROM users WHERE email = $1", [email],  (e, user) -> 
		callback user

exports.getAccountByUsername = (username, callback) ->

	db.query "SELECT * FROM users WHERE user = $1", [username], (e,user) ->
		callback null, user

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

# auxiliary methods 

findById = (id, callback) ->

	db.query "SELECT * FROM users WHERE id = $1", [id], (error, res) ->
		return res

*/

// private encryption & validation methods 

function generateSalt() {
	
	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	var salt = '';
	for (var i = 0; i < 11; i++) {
		p = Math.floor(Math.random() * set.length);
		salt += set[p];
	}
	
	return salt;

}

function md5(str){

	return crypto.createHash('md5').update(str).digest('hex');

}

function saltAndHash(pass, callback) {

	var salt = generateSalt();
	callback(salt + md5(pass + salt));

}


function validatePassword(plainPass, hashedPass, callback) {
	var salt = hashedPass.substr(0, 11);
	validHash = salt + md5(plainPass + salt);
	callback(null, hashedPass == validHash);
}