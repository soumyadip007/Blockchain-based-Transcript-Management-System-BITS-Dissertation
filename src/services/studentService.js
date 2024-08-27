const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/student');
const Transcript = require('../models/transcript');
const { JWT_SECRET } = require('../config/environment');

// Student Login
const loginStudent = async (email, password) => {
  const student = await Student.findOne({ email });

  if (!student) {
    throw new Error('Student not found');
  }

  const isMatch = await bcrypt.compare(password, student.password);

  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: student._id, role: 'student' }, JWT_SECRET, {
    expiresIn: '1h',
  });

  return { token, student };
};

// Update Student Details
const updateStudentDetails = async (studentId, studentData) => {
  const student = await Student.findByIdAndUpdate(studentId, studentData, {
    new: true,
  });

  if (!student) {
    throw new Error('Student not found');
  }

  return student;
};

// Retrieve Shareable Transcript
const getShareableTranscript = async (studentId, transcriptId) => {
  const transcript = await Transcript.findOne({
    student_id: studentId,
    _id: transcriptId,
  });

  if (!transcript) {
    throw new Error('Transcript not found');
  }

  return {
    transcriptId,
    blockDetails: transcript.block_details,
  };
};

module.exports = {
  loginStudent,
  updateStudentDetails,
  getShareableTranscript,
};
