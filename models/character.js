var mongoose = require('mongoose');
var NoteSchema = require('./note').schema;

var CharacterSchema = new mongoose.Schema({
  name: String,
  house: String,
  notes: [NoteSchema]
  // createdAt: Date,
  // updatedAt: Date
})

var Character = mongoose.model('Character', CharacterSchema);
module.exports = Character;
