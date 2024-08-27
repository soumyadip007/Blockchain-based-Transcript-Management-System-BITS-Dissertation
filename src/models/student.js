const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  subject_name: { type: String, required: true },
  marks: { type: Number, required: true },
  grade: { type: String, required: true },
});

const SemesterSchema = new mongoose.Schema({
  semester_number: { type: Number, required: true },
  subjects: [SubjectSchema],
});

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  phone_number: { type: String, required: true },
  enrollment_year: { type: String, required: true },
  course: { type: String, required: true },
  semesters: [SemesterSchema],
});

module.exports = mongoose.model('Student', StudentSchema);
