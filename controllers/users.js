var express       = require('express');
var router        = express.Router();
var request       = require('request');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User          = require('../models/user');

//Sign Up
router.post('/signup', function(req, res){
  User.register(new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password}),
  req.body.password, function (err, user) {
    if (err) {
      console.log('ERROR ==> ', err);
    } else {
      console.log('NEW USER ==> ', user);
      res.json({user:user})
    }
  });
});

//Log In
router.post('/login', passport.authenticate('local'), function(req, res){
  req.session.save(function(err){
    if (err) return next(err);
    res.json({status: 200, user: req.user});
  });
});

//Add Character
router.post('/add', function(req, res){
  var user = req.session.passport.user;
  User.find({username: user}).exec()
  .then(function(user){
    user[0].characters.push({
      name: req.body.name,
      house: req.body.house,
      notes: ""
    })
    return user[0].save();
  })
  .then(function(user){
    res.json({user:user})
  })
  .catch(function(error){
    console.log(error);
  })
})

//Add Note
router.put('/characters/:id', function(req, res){
  var user = req.session.passport.user;
  User.findOne({username: user}).exec()
    .then(function(user){
      console.log(req.body.content);
      var character = user.characters.id(req.params.id)
      character.notes.push(req.body.content);
      // user.save();
    })
    .then(function(res){
      console.log(res);
    })
    .catch(function(error){
      console.log(error);
    })
  // console.log(req.body.character.notes);
})

//Log Out
router.delete('/logout', function(req, res){
  req.logout();
  res.json({status: 200, message: 'Logged Out'})
});



module.exports = router;
