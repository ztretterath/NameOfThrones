var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var CharacterSchema = new mongoose.Schema({
  name: String,
  house: String,
  createdAt: Date,
  updatedAt: Date
})

UserSchema.plugin(passportLocalMongoose);
var Character = mongoose.model('Character', CharacterSchema);
module.exports = Character;
