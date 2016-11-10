var mongoose = require('mongoose');

var CharacterSchema = new mongoose.Schema({
  name: String,
  house: String,
  createdAt: Date,
  updatedAt: Date
})

var Character = mongoose.model('Character', CharacterSchema);
module.exports = Character;
