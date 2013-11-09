var express = require('express');

//var user = require './routes/user';
//var info = require './routes/info';
var Main = require('./routes/main');

router = function(app) {

  app.all('/', Main.index);
  // app.get('/', function(request, response) {
  //   response.send('Hello World!');
  // });

}
/*
  #AUTHENTICATION NOT REQUIRED
  #User Login/Signup Routes
  app.all '/', Main.index
  app.get '/signup', user.signup
  app.post '/signup', user.signup
  app.post '/login', user.login
  app.post '/2013hype', user.submitHype
  app.get '/logout', user.logout
  app.get '/confirm/:email/:key', user.confirmUserFromEmail
  app.post '/confirm', user.confirmUserFromForm
  #Static GET Routes
  app.get '/about', info.about
  app.get '/contact', info.contact
  app.get '/2013', Main.clab2013
  app.get '/2013mcs', Main.clab2013mcs
  app.get '/2013beats', Main.clab2013beats
  #app.get '/2013voters', Main.clab2013voters


  #MUST BE LOGGED IN FROM HERE DOWN
  #validate authentic user, first check for active session, or cookies
  # if !req.session.user || 
  #      !req.cookies.user == undefined && !req.cookies.pass == undefined 
  #         && user.validate_user req.cookies.user, req.cookies.pass)) {

  #first check for active session
  #logged in user functions
  app.get '/home', user.show_home
  app.get '/edit-account', user.edit_user
  app.post '/edit-account', user.update_user
  app.get '/logout', user.logout

  # password reset #
  app.post '/lost-password', user.lost_password
  app.get '/reset-password', user.reset_password
  app.post '/reset-password', user.save_reset_password

  # Administrative Actions
  app.get '/users', user.list_users
  app.get '/edit_account/:username', user.manage_user
  app.post '/delete-user', user.delete_user
  #not sure what this does
  # app.get '/reset-password', function req, res) {
  #     AM.delAllRecords function ){
  #         res.redirect '/print'   
  #     }
  # }

  #IF NO URL MATCHES, SERVE 404, MUST BE LAST ROUTE!
  app.get '*', (req, res) ->
    res.render 'error/404', { title: 'Page Not Found'}

*/

module.exports = router