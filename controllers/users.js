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

//Get characters after CRUD logic
router.get('/getChars', function(req, res){
  var user = req.session.passport.user;
  User.find({username: user}).exec()
    .then(function(user){
      var characters = user[0].characters;
      res.json({characters: characters})
    })
    .catch(function(error){
      console.log(error);
    })
})

//Add Character
router.post('/add', function(req, res){
  var user = req.session.passport.user;
  User.find({username: user}).exec()
  .then(function(user){
    user[0].characters.push({
      name: req.body.name,
      house: req.body.house,
      notes: req.body.notes
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

//Edit Character
router.put('/update', function(req, res){
  var user = req.session.passport.user;
  User.findOne({username: user}).exec()
    .then(function(user){
      var character = user.characters.id(req.body.character._id)
      character.name = req.body.character.name;
      character.house = req.body.character.house;
      character.notes = req.body.character.notes;
      return user.save();
    })
    .catch(function(error){
      console.log(error);
    })
})

// Delete Character
router.delete('/delete/:characterId', function(req, res){
  var user = req.session.passport.user;
  User.findOne({username: user}).exec()
    .then(function(user){
      var character = user.characters.id(req.params.characterId)
      character.remove();
      return user.save();
    })
    .then(function(user){
      res.json({user: user})
    })
    .catch(function(error){
      console.log(error);
    })
})

//Log Out
router.delete('/logout', function(req, res){
  req.logout();
  res.json({status: 200, message: 'Logged Out'})
});



module.exports = router;
