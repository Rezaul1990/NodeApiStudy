const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Adjust the path as needed

// Middleware to check if the request contains a valid token
const protect = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Get token from header

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Directly use the JWT_SECRET value instead of from process.env
    const secretKey = 'hsgdfsdhfsjdfhdjfhsfhsdfjyueyruywbsf';  // Replace this with your actual secret
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded.user; // Attach user info to request object
    next(); // Allow the request to proceed
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = protect;
