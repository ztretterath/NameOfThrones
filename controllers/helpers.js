var express = require('express');
var router = express.Router();
var request = require('request');

//Helper for GoT API
// router.get('/got', function(req, res){
//   var name = req.body.name
//   console.log(name);
//   request(`https://api.got.show/api/characters/paths/'${name}'`, function(error, res, body) {
//     if (!error && res.statusCode == 200) {
//       var parse = JSON.parse(body);
//       res.json(parse)
//     }
//   })
// })
// router.get('/getChars', function(req, res){
//   var user = req.session.passport.user;
//   User.find({username: user}).exec()
//     .then(function(user){
//       return user[0].characters
//     })
// })

//Set currentUser
router.get('/getUser', function(req, res){
  var user = req.user;
  res.json({user: user});
})


module.exports = router;