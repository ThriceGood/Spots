const express = require('express')
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator')
const flash = require('connect-flash')
const session = require('express-session')

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

// express session
app.use(session({
  secret: 'should come from env vars or config file',
  resave: true,
  saveUninitialized: true,
}))

// express messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// express validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// set routes
app.use('/', index)

// start app
app.listen(3000, function () {
  console.log('app listening on port 3000')
})
