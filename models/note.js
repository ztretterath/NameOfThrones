var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({
  content: String
  // createdAt: Date,
  // updatedAt: Date
})

var Note = mongoose.model('Note', NoteSchema);
module.exports = Note;
