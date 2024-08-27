const express = require('express');
const {
  loginAdmin,
  createStudent,
  updateStudent,
  sendDefaultPassword,
  generateTranscript,
  createShareableBlock,
} = require('../services/adminService');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Admin Login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await loginAdmin(email, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Create Student
router.post('/student', authenticateToken, async (req, res, next) => {
  try {
    const student = await createStudent(req.body);
    res.status(201).json(student);
  } catch (error) {
    next(error);
  }
});

// Update Student Details
router.put('/student/:student_id', authenticateToken, async (req, res, next) => {
  try {
    const student = await updateStudent(req.params.student_id, req.body);
    res.json(student);
  } catch (error) {
    next(error);
  }
});

// Send Default Password
router.post(
  '/student/:student_id/send-password',
  authenticateToken,
  async (req, res, next) => {
    try {
      await sendDefaultPassword(req.params.student_id);
      res.json({ message: 'Password sent successfully' });
    } catch (error) {
      next(error);
    }
  },
);

// Generate Transcript Details
router.post(
  '/student/:student_id/transcript',
  authenticateToken,
  async (req, res, next) => {
    try {
      const transcript = await generateTranscript(
        req.params.student_id,
        req.body,
      );
      res.status(201).json(transcript);
    } catch (error) {
      next(error);
    }
  },
);

// Create Shareable Block Details
router.post(
  '/student/:student_id/transcript/:transcript_id/block',
  authenticateToken,
  async (req, res, next) => {
    try {
      const blockDetails = await createShareableBlock(
        req.params.student_id,
        req.params.transcript_id,
      );
      res.status(201).json(blockDetails);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
