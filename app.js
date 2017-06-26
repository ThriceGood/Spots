const express = require('express')
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// database
mongoose.connect('mongodb://localhost/spots');
let db = mongoose.connection;

// // Check connection
db.once('open', function(){
  console.log('connected to MongoDB');
});

// // Check for DB errors
db.on('error', function(err){
  console.log(err);
});

// import routes
const index = require('./routes/index');

// initialize app
const app = express()

// view Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// body parser, for extracting data from POST bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// set routes
app.use('/', index)

// start app
app.listen(3000, function () {
  console.log('app listening on port 3000')
})
