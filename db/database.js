pg = require 'pg'

//used for heroku

/*
creds = {
   user: 'fxzwhgnpkibrya',
   password: 'qXO0tm6iBq3Jq4X_XEQvw0SQ9u',
   database: 'd3iubcumqfbf9b',
   host: 'ec2-54-243-228-241.compute-1.amazonaws.com',
   port: 5432,
   ssl: true
}
*/

creds = {
  user:'postgres',
  password:'joel',
  database:'postgres',
  host:'localhost'
  port:5432
}

client = null;

exports.start_session = function() {

  if (client)
    return client;

  client = new pg.Client(creds);

  client.connect();

  return client;
}