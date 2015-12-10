var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

var createHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10));
}

function findOrCreateUser(req, username, password, done) {
    console.log('in the findOrCreateUser');
    User.findOne({
        'username': username
    }, function(err, user) {
        if (err) {
            console.log(err);
            console.log('In user: ' + user);
            return done(err);
        }

        if (user) {
            console.log('User already exists: ' + user);
            return done(null, false, req.flash('message', 'User already exists.'));
        }
        else {
            var newUser = new User();
            newUser.username = username;
            newUser.password = createHash(password);
            newUser.email = req.body.email;
            newUser.firstName = req.body.firstName;
            newUser.lastName = req.body.lastName;

            newUser.save(function(err) {
                if (err) {
                    console.log('Error saving user: ' + err);
                    console.log('User: ' + user);
                    throw err;
                }

                console.log('User registered successfully: ' + user);
                return done(null, newUser);
            })
        }
    })
}

module.exports = function(passport) {
    passport.use('register', new LocalStrategy({
        passReqToCallback: true
    }, function(req, username, password, done) {
        // process.nextTick(
        //     User.findOne({
        //         'username': username
        //     }, function(err, user) {
        //         if (err) {
        //             console.log(err);
        //             done(err);
        //         }

        //         if (user) {
        //             console.log('User already exists: ' + user);
        //             return done(null, false, req.flash('message', 'User already exists.'));
        //         }
        //         else {
        //             var newUser = new User();
        //             newUser.username = username;
        //             newUser.password = createHash(password);
        //             newUser.email = req.body.email;
        //             newUser.firstName = req.body.firstName;
        //             newUser.lastName = req.body.lastName;

        //             newUser.save(function(err) {
        //                 if (err) {
        //                     console.log('Error saving user: ' + err);
        //                     console.log('User: ' + user);
        //                     throw err;
        //                 }

        //                 console.log('User registered successfully: ' + user);
        //                 return done(null, newUser);
        //             })
        //         }
        //     })
        // );
        process.nextTick(function() {
            User.findOne({
                'username': username
            }, function(err, user) {
                if (err) {
                    console.log(err);
                    console.log('In user: ' + user);
                    return done(err);
                }

                if (user) {
                    console.log('User already exists: ' + user);
                    return done(null, false, req.flash('message', 'User already exists.'));
                }
                else {
                    var newUser = new User();
                    newUser.username = username;
                    newUser.password = createHash(password);
                    newUser.email = req.body.email;
                    newUser.firstName = req.body.firstName;
                    newUser.lastName = req.body.lastName;

                    newUser.save(function(err) {
                        if (err) {
                            console.log('Error saving user: ' + err);
                            console.log('User: ' + user);
                            throw err;
                        }

                        console.log('User registered successfully: ' + user);
                        return done(null, newUser);
                    })
                }
            })
        });

    }));
}