const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const sharp = require('sharp');

// import models
const Spot = require('../models/spot.model')
const User = require('../models/user.model')


// admin route
router.get('/', authenticate, function(req, res, next){
    res.render('admin.html');
});

// get all users route
router.get('/getUsers', authenticate, function(req, res, next){
    User.find({}, function (err, users) {
        if (err) return handleError(err);
        res.json(users);
    });
});

router.delete('/deleteUser/:username', authenticate, function(req, res, next) {
    User.remove({username: req.params.username}, function(err) {
        if (err) {
            res.json({message: err});
        } else {
            res.json({message: 'user deleted'});
        }
    });
});

// TODO: still to implement updates
// update spots
router.post('/', authenticate, function(req, res, next){
    var error_message = validateSpotInput(req);
    if (error_message) {
        req.flash('error', error_message.join(', '));
        res.redirect('/');
    } else {
        User.findById(req.user._id, function(err, user){
            if (err) throw err;
            // save photo
            var photo = req.files.photo;
            var photoname = '';
            if (photo) {
                photoname = resizeAndSavePhoto(photo, req.user._id);                
            }
            // save spot
            var spot = new Spot({
                coords: req.body.coords,
                name: req.body.name,
                address: req.body.address,
                description: req.body.description,
                photo: photoname,
                uploadBy: user.username,
                uploadDate: new Date()
            });
            spot.save(function(err, upload) {
                if (err) return console.error(err);
                console.log('spot successfully saved');
            })
            res.redirect('/');
        });
    }
});

function validateSpotInput(req) {
    req.checkBody('coords', 'coords was not populated').notEmpty();
    req.checkBody('name', 'name is required field').notEmpty();
    req.checkBody('address', 'address is required field').notEmpty();
    req.checkBody('description', 'description is required field').notEmpty();
    var errors = req.validationErrors();
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

router.delete('/deleteSpot/:name', authenticate, function(req, res, next) {
    Spot.remove({name: req.params.name}, function(err) {
        if (err) {
            res.json({message: err});
        } else {
            res.json({message: 'spot deleted'});
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
