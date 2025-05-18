const express = require('express');
const { loginUser } = require('../controllers/authController');  // Import the controller function
const { registerUser } = require('../controllers/registerController');  // Import the controller function

const router = express.Router();

// Login route
router.post('/login', loginUser);  // Use the controller's login function
// Register route
router.post('/register', registerUser);

module.exports = router;
