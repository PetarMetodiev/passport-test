var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

module.exports = function(passport) {

    router.get('/', function(req, res) {
        // Display the Login page with any flash message, if any
        res.render('index', {
            message: req.flash('message'),
            title: 'Be awesome!'
        });
    });

    router.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true
    }));

    router.get('/register', function(req, res) {
        res.render('register', {
            message: req.flash('message')
        });
    });

    router.post('/register', passport.authenticate('register', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true
    }));

    router.get('/home', isLoggedIn, function(req, res) {
        res.render('home', {
            user: req.user
        });
    });

    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    })

    return router;
};
