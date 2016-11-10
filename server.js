//Express
var express = require('express');
var app     = express();
var path    = require('path');

//Debug
var logger = require('morgan');
app.use(logger('dev'));

//Request Handlers
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

//Static
app.use(express.static(__dirname + '/public'));

//Mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', function(err){
  console.log(err);
});
db.once('open', function(){
  console.log('Database Connected!');
});

// //Passport for Auth
// var passport      = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// app.use(require('express-session')({
//   secret: 'king in the north',
//   resave: false,
//   saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

//Controllers
var usersController = require('./controllers/users.js');

//Route
app.use('/users', usersController);

app.listen(process.env.PORT || 3000, function(){
  console.log('LOUD AND CLEAR ON 3000');
});


//Eventual Heroku
// var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/nameofthrones';
// mongoose.connect(mongoURI);
