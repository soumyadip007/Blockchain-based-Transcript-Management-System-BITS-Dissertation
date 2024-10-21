const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Student = require('../models/student');
const Transcript = require('../models/transcript');
const { JWT_SECRET } = require('../config/environment');
const { deploy } = require('../blockchain/deploy');
//const { sendEmail } = require('../utils/emailService');

// Admin Login
const loginAdmin = async (email, password) => {
  const admin = await Admin.findOne({ email });

  if (!admin) {
    throw new Error('Admin not found');
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: admin._id, role: admin.role }, JWT_SECRET, {
    expiresIn: '1h',
  });

  return { token, admin };
};

// Create Student
const createStudent = async (studentData) => {
  const hashedPassword = await bcrypt.hash(studentData.password, 10);
  const student = new Student({
    ...studentData,
    password: hashedPassword,
  });

  await student.save();
  return student;
};

// Update Student Details
const updateStudent = async (studentId, studentData) => {
  const student = await Student.findByIdAndUpdate(studentId, studentData, {
    new: true,
  });

  if (!student) {
    throw new Error('Student not found');
  }

  return student;
};

// Send Default Password
const sendDefaultPassword = async (studentId) => {
  const student = await Student.findById(studentId);

  if (!student) {
    throw new Error('Student not found');
  }

  const password = 'defaultPassword123'; // Replace with your logic for generating a default password
  student.password = await bcrypt.hash(password, 10);
  await student.save();

  // await sendEmail(
  //   student.email,
  //   'Your Default Password',
  //   `Your default password is: ${password}`,
  // );
};

// Generate Transcript
const generateTranscript = async (studentId, transcriptData) => {
  const transcript = new Transcript({
    student_id: studentId,
    details: transcriptData.details,
    block_details: transcriptData.block_details,
  });

  try {
    const hash = await deploy(['test']);
   //await transcript.save();
  } catch (error) {
    throw new Error(error);
  }

  return transcript;
};

// Create Shareable Block
const createShareableBlock = async (studentId, transcriptId) => {
  const transcript = await Transcript.findById(transcriptId);

  if (!transcript) {
    throw new Error('Transcript not found');
  }

  // Replace with your blockchain logic
  const blockDetails = `Blockchain details for student ${studentId}`;

  transcript.block_details = blockDetails;

  await transcript.save();

  return { transcriptId, blockDetails };
};

module.exports = {
  loginAdmin,
  createStudent,
  updateStudent,
  sendDefaultPassword,
  generateTranscript,
  createShareableBlock,
};
