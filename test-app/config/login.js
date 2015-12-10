var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

var isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.password);
}

module.exports = function(passport) {
    passport.use('login', new LocalStrategy({
            passReqToCallback: true     // the req object is allowed to be used in the callback(the second parameter of new LocalStrategy())
        },
        function(req, username, password, done) {
            User.findOne({      // using mongoose api to find the user in the db by username
                'username': username
            }, function(err, user) {        // callback to handle the user authentication
                if (err) {      // if some error has occurred 
                    console.log(err);
                    return done(err);
                }

                if (!user) {        // if the entered username is not in the db
                    console.log('User not found: ' + username);
                    return done(null, false, req.flash('message', 'User not found.'));
                }
                
                if (!isValidPassword(user, password)) {     // if the username does not match the password in the db
                    console.log('Invalid password: ' + username);
                    return done(null, false, req.flash('message', 'Invalid password'));
                }

                return done(null, user);        // finally if everything is ok, pass the user object to passport

            });
        }));
}