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
        // console.log(spots)
        if (err) return handleError(err);
        res.json(spots);
    });
});

// save spots
router.post('/', function(req, res, next){
    var spot = new Spot({
        coords: req.body.coords,
        name: req.body.name,
        street: req.body.street,
        description: req.body.description,
        uploadBy: 'Jonathan',
        uploadDate: '21-06-2017 16:43:21'
    });
    spot.save(function (err, upload) {
        if (err) return console.error(err);
        console.log('spot successfully saved')
    })
    res.redirect('/');
});

// make exportable to use in main app.js file
module.exports = router;
