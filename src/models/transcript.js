const mongoose = require('mongoose');

const TranscriptSchema = new mongoose.Schema({
  student_id: { type: String, required: true },
  details: { type: String, required: true },
  block_details: { type: String, required: true , unique: true },
});

module.exports = mongoose.model('Transcript', TranscriptSchema);
