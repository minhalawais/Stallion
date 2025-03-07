const express = require('express');
const router = express.Router();
const authController = require('../controllers/userAuthController'); 
const { authenticateToken } = require('../middleware/userauth');


router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/verify', authenticateToken, authController.verifyToken);


// Test function
// router.get('/login', (req, res) => {
//     res.json("Hurray");
// });

//router.post('/checkDuplicateEmail', authController.checkDuplicateEmail);

// router.post("/signup",authController.signup)
module.exports = router;
