/*
CREATE TABLE users (
   user_name varchar(24),
   password  varchar(24),
   date_registered date,
   primary key(user_name)
);
*/

exports.addUser = function (user, callback) {
    //try to add user to DB connection
    if(true) {
        //user added successfully
        callback();
    } else {
        callback("TEMP ERROR MESSAEG");
    }

};