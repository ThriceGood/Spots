const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport')

// import models
const User = require('../models/user.model')


// required for redirect after user registration
router.get('/', function(req, res, next){
    res.render('index.html');
});

// register user
router.post('/', function(req, res, next){
    req.checkBody('username', 'username is required field').notEmpty();
    req.checkBody('password', 'password is required field').notEmpty();
    req.checkBody('confirmPassword', 'confirm password is required field').notEmpty();
    req.checkBody('password', 'passwords do not match').equals(req.body.confirmPassword);
    req.checkBody('email', 'email is required field').notEmpty();
    req.checkBody('email', 'email is not valid').isEmail();
    req.checkBody('location', 'location is required field').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        res.render('index.html', {errors:errors});
    } else {
        var newUser = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            location: req.body.location,
            joinDate: new Date()
        });
        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(newUser.password, salt, function(err, hash){
                if (err) return console.error(err);
                newUser.password = hash;
                newUser.save(function(err, upload) {
                    if (err) return console.error(err);
                    console.log('User successfully registered')
                    req.flash('success', 'You have been successfully registered')
                })
                res.redirect('/');
            });
        });
    }
});

// user login
router.post('/login', function(req, res, next){
    req.checkBody('username', 'username is required field').notEmpty();
    req.checkBody('password', 'password is required field').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        res.render('index.html', {errors:errors});
    } else {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/',
            failureflash: true
        })(req, res, next);
    }
});


// make exportable to use in main app.js file
module.exports = router;
