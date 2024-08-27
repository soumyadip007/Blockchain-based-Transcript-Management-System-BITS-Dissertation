const mongoose = require('mongoose');

const TranscriptSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  details: { type: String, required: true },
  block_details: { type: String, required: true },
});

module.exports = mongoose.model('Transcript', TranscriptSchema);
