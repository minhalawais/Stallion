const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/userauth');
const { 
  getUserProfile,
  updateUserProfile 
} = require('../controllers/userController');

router.get('/profile', authenticateToken, getUserProfile);
router.put('/profile', authenticateToken, updateUserProfile);

module.exports = router;
