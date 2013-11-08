pg = require 'pg'

# https://github.com/brianc/node-postgres/wiki for references
# find this by typing "heroku config | grep HEROKU_POSTGRESQL" in terminal
# conString = "postgres://fxzwhgnpkibrya:qXO0tm6iBq3Jq4X_XEQvw0SQ9u@ec2-54-243-228-241.compute-1.amazonaws.com:5432/d3iubcumqfbf9b"

creds = {
   user: 'fxzwhgnpkibrya',
   password: 'qXO0tm6iBq3Jq4X_XEQvw0SQ9u',
   database: 'd3iubcumqfbf9b',
   host: 'ec2-54-243-228-241.compute-1.amazonaws.com',
   port: 5432,
   ssl: true
}

###creds = {
  user:'postgres',
  password:'joel',
  database:'postgres',
  host:'localhost'
  port:5432
}###

client = null

exports.start_session = () ->

  if client
    return client

  #if in Production, use local var
  #if process.env.DATABASE_URL
  #	client = new pg.Client #process.env.DATABASE_URL
  #else 
  client = new pg.Client creds

  client.connect()

  return client