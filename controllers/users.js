var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

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

module.exports = router;
