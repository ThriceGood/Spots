const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const sharp = require('sharp');

// import models
const Spot = require('../models/spot.model')
const User = require('../models/user.model')
const Contact = require('../models/contact.model')


// admin route
router.get('/', authenticate, function(req, res, next){
    res.render('admin.html');
});

// get all users route
router.get('/getUsers', authenticate, function(req, res, next){
    User.find({}, function (err, users) {
        if (err) return err;
        res.json(users);
    });
});

// update user
router.put('/user', authenticate, function(req, res, next){
    var updateParams = {
        username: req.body.username,
        email: req.body.email,
        location: req.body.location,
    }
    User.findOneAndUpdate({_id: req.body.userId}, {$set: updateParams}, function(err, user){
        if (err) {
            res.json({message: err});            
        } else {
            res.json({message: 'user updated'});
        }
    });
});

// delete user
router.delete('/user/:id', authenticate, function(req, res, next) {
    User.remove({_id: req.params.id}, function(err) {
        if (err) {
            res.json({message: err});
        } else {
            res.json({message: 'user deleted'});
        }
    });
});

// update spot
router.put('/spot', authenticate, function(req, res, next){
    var updateParams = {
        name: req.body.name,
        address: req.body.address,
        description: req.body.description,
    }
    Spot.findOneAndUpdate({_id: req.body.spotId}, {$set: updateParams}, function(err, spot){
        if (err) {
            res.json({message: err});            
        } else {
            res.json({message: 'spot updated'});
        }
    });
});

// delete spot
router.delete('/spot/:id', authenticate, function(req, res, next) {
    Spot.remove({_id: req.params.id}, function(err) {
        if (err) {
            res.json({message: err});
        } else {
            res.json({message: 'spot deleted'});
        }
    });
});

// get all contacts route
router.get('/getContacts', authenticate, function(req, res, next){
    Contact.find({}, function (err, contacts) {
        if (err) return err;
        res.json(contacts);
    });
});

// receive contact
router.post('/contact', function(req, res, next) {
    var contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
        date: new Date()
    });
    contact.save(function(err, contact) {
        if (err) throw err;
        console.log('Contact successfully saved');
        req.flash('success', 'your message has been sent');
    })
    res.redirect('/');        
});

// delete spot
router.delete('/contact/:id', authenticate, function(req, res, next) {
    Contact.remove({_id: req.params.id}, function(err) {
        if (err) {
            res.json({message: err});
        } else {
            res.json({message: 'contact deleted'});
        }
    });
});


function authenticate(req, res, next) {
    if (req.isAuthenticated() && req.user['isAdmin'] == true) {
        return next();
    } else {
        if (req.header('Content-Type') == 'application/json') {
            res.json({message: 'access denied'});
        } else {
            req.flash('error', 'you do not have access to this page');
            res.redirect('/');
        }
    }
}


// make exportable to use in main app.js file
module.exports = router;
