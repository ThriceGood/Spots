const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport')

// import models
const User = require('../models/user.model')


// required for redirect after user registration
router.get('/', function(req, res, next){
    res.render('index.html', {messages: req.flash('error')});
});

// register user
router.post('/', function(req, res, next){
    var error_message = validateRegistrationInput(req);
    if (error_message) {
        req.flash('error', error_message.join(', '));
        res.redirect('/');
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
                    console.log('User successfully registered');
                    req.flash('success', 'You have successfully registered');
                    passport.authenticate('local', {
                        successRedirect: '/',
                        failureRedirect: '/',
                        failureflash: true
                    })(req, res, next);
                })
            });
        });
    }
});

function validateRegistrationInput(req=false, errors=false) {
    // allow errors to be passed in, for login validation
    if (req) {
        req.checkBody('username', '').notEmpty();
        req.checkBody('password', '').notEmpty();
        req.checkBody('confirmPassword', '').notEmpty();
        req.checkBody('password', 'passwords do not match').equals(req.body.confirmPassword);
        req.checkBody('email', '').notEmpty();
        req.checkBody('email', '').isEmail();
        req.checkBody('location', '').notEmpty();
        var errors = req.validationErrors();
    }
    var error_message = [];
    if (errors) {
        for (i in errors) {
            error_message.push(errors[i].msg);
        }
        return error_message;
    } else {
        return false;
    }
}

// user login
router.post('/login', function(req, res, next){
    req.checkBody('username', 'username is required field').notEmpty();
    req.checkBody('password', 'password is required field').notEmpty();
    var errors = req.validationErrors();
    var error_message = validateRegistrationInput(errors);
    if (error_message) {
        req.flash('error', error_message.join(', '));
        res.redirect('/');
    } else {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/',
            failureflash: true
        })(req, res, next);
    }
});

// check if username exists
router.get('/checkUsername/:username',function(req, res, next){
    var username = req.params.username;
    User.findOne({username:username}, function(err, user){
        if (err) return console.error(err);
        if (user) {
            res.json({result: 'true'});
        } else {
            res.json({result: 'false'});
        }
    });
});


// make exportable to use in main app.js file
module.exports = router;
