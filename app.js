const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const profileRoutes = require('./routes/profileRoutes');
const memberRoutes = require('./routes/memberProfileRoutes');
const authRoutes = require('./routes/authRoutes');
const protect = require('./middleware/auth');
const classRoutes = require('./routes/classRoutes');
const coachRoutes = require('./routes/coachRoutes');

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());

// ✅ Serve static images (upload folder)
app.use('/uploads', express.static('uploads'));

// ✅ Only parse JSON where needed (do NOT apply it blindly to file uploads)
app.use((req, res, next) => {
  if (req.headers['content-type']?.includes('multipart/form-data')) {
    next(); // Skip JSON body parser for file uploads
  } else {
    express.json()(req, res, next);
  }
});

app.use(express.urlencoded({ extended: true }));

// ✅ Public route (auth/login/register)
app.use('/api/auth', authRoutes);

// ✅ Protected routes
app.use('/api/profiles', protect, profileRoutes);
app.use('/api/memberprofile', protect, memberRoutes);
app.use('/api/classes',protect, classRoutes); 
app.use('/api/coaches',protect, coachRoutes);

// Test route
app.get('/', (req, res) => {
  res.send("🚀 Profile API Running");
});

module.exports = app;
