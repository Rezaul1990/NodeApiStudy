const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const profileRoutes = require('./routes/profileRoutes');
const memberRoutes = require('./routes/memberProfileRoutes');
const authRoutes = require('./routes/authRoutes');
const protect = require('./middleware/auth');

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', protect, profileRoutes);
app.use('/api/memberprofile', protect, memberRoutes);

app.get('/', (req, res) => {
  res.send("🚀 Profile API Running");
});

module.exports = app;
