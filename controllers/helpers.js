var express = require('express');
var router = express.Router();
var request = require('request');

//Helper for GoT API
router.post('/got', function(req, res){
  var num = req.body.char
  request(`http://www.anapioficeandfire.com/api/characters/${num}`, function(error, response, body) {
    if (!error && res.statusCode == 200) {
      var parse = JSON.parse(body);
      res.json(parse);
    }
  })
})


//Set currentUser
router.get('/getUser', function(req, res){
  var user = req.user;
  res.json({user: user});
})


module.exports = router;
