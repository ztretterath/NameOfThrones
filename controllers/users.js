var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

router.post('/signup', function(request, response){
  console.log('SIGN UP ==>', request.body);
})

module.exports = router;
