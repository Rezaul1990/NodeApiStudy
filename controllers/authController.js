const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Adjust the path as needed

// In your login route, directly use the JWT_SECRET string
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and send JWT token
    const payload = {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    };

    const secretKey = 'hsgdfsdhfsjdfhdjfhsfhsdfjyueyruywbsf';  // Replace this with your actual secret
    const token = jwt.sign(payload, secretKey, { expiresIn: '2h' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
