const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jimp = require('jimp');

// import models
const Spot = require('../models/spot.model')
const User = require('../models/user.model')


// index route
router.get('/', function(req, res, next){
    res.render('index.html');
});

// get all spots route
router.get('/getSpots', function(req, res, next){
    Spot.find({}, function (err, spots) {
        if (err) return handleError(err);
        res.json(spots);
    });
});

// save spots
router.post('/', authenticate, function(req, res, next){
    var error_message = validateSpotInput(req);
    if (error_message) {
        req.flash('error', error_message.join(', '));
        res.redirect('/');
    } else {
        User.findById(req.user._id, function(err, user){
            if (err) throw err;;
            // save photo
            var photo = req.files.photo;
            var photoname = '';
            if (photo) {
                photoname = savePhoto(photo, req.user._id);
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

function savePhoto(photo, userId) {
    var timestamp = Math.round((new Date()).getTime() / 1000);
    var photoname = userId + - + timestamp + '.png';
    jimp.read(photo.data, function (err, photo) {
        if (err) throw err;
        photo.resize(400, jimp.AUTO)            
            .quality(70)
            .write("public/uploads/" + photoname);
    });
    return photoname;
}

function authenticate(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/')
    }
}


// make exportable to use in main app.js file
module.exports = router;
