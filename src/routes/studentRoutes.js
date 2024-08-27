const express = require('express');
const {
  loginStudent,
  updateStudentDetails,
  getShareableTranscript,
} = require('../services/studentService');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Student Login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await loginStudent(email, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Update Student Details
router.put('/:student_id', authenticateToken, async (req, res, next) => {
  try {
    const student = await updateStudentDetails(req.params.student_id, req.body);
    res.json(student);
  } catch (error) {
    next(error);
  }
});

// Retrieve Shareable Transcript
router.get(
  '/:student_id/transcript/:transcript_id/shareable',
  authenticateToken,
  async (req, res, next) => {
    try {
      const transcript = await getShareableTranscript(
        req.params.student_id,
        req.params.transcript_id,
      );
      res.json(transcript);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
