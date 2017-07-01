const express 	= require('express');
const router 	= express.Router();
const mongoose 	= require('mongoose');

// import models
const Spot = require('../models/spot.model')


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
router.post('/', function(req, res, next){
    req.checkBody('coords', 'coords was not populated').notEmpty();
    req.checkBody('name', 'name is required field').notEmpty();
    req.checkBody('address', 'address is required field').notEmpty();
    req.checkBody('description', 'description is required field').notEmpty();
    // req.checkBody('uploadBy', 'user was not populated').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        res.render('index.html', {errors:errors});
    } else {
        var spot = new Spot({
            coords: req.body.coords,
            name: req.body.name,
            address: req.body.address,
            description: req.body.description,
            uploadBy: 'Jonathan',
            uploadDate: getCurrentDate()
        });
        spot.save(function (err, upload) {
            if (err) return console.error(err);
            console.log('spot successfully saved')
            req.flash('success', 'spot successfully added')
        })
        res.redirect('/');
    }
});

function getCurrentDate() {
    // off by -2 hours
    // maybe set up created_at with mongo
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + ' ' + time;
}

// make exportable to use in main app.js file
module.exports = router;
