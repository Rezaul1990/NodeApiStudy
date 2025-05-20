const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      username,
      email,
      password,
    });

    await user.save(); // password hashed in pre-save hook (using bcrypt)

    // ✅ Generate JWT token and send in response body
    const payload = {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

    // ✅ Fix: return token properly
    res.status(201).json({ token });
  } catch (err) {
    console.error('Registration Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
