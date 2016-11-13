var mongoose = require('mongoose');
var CharacterSchema = require('./character').schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  characters: [CharacterSchema]
  // createdAt: Date,
  // updatedAt: Date
})

UserSchema.plugin(passportLocalMongoose);
var User = mongoose.model('User', UserSchema);
module.exports = User;
