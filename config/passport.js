const strategy = require('passport-local').Strategy;
const User = require('../models/user.model');
const config = require('../config/config');
const bcrypt = require('bcryptjs');

module.exports = function(passport) {
    passport.use(new strategy(function(username, password, done){
        // find user
        User.findOne({username:username}, function(err, user){
            if (err) return console.error(err);
            if (!user) {
                return done(null, false, {message: 'incorrect credentials'});
            }
            // match password
            bcrypt.compare(password, user.password, function(err, isMatch){
                if (err) return console.error(err);
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'incorrect credentials'});             
                }
            });
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}