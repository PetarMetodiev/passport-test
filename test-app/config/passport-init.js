var login = require('./login');
var register = require('./register');
var User = require('../models/user');

module.exports = function(passport){
    passport.serializeUser(function(user, done){
        console.log('Serializing user: ' + user);
        console.log('user._id: ' + user._id);
        console.log('user.id: ' + user.id);
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done){
       User.findById(id,function(err, user){
           console.log('Deserializing user: ' + user);
           done(err, user);
       }) ;
    });
    
    login(passport);
    register(passport);
}