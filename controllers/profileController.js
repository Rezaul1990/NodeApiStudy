const Profile = require('../models/profileModel');

// ✅ CREATE profile with image and user
exports.createProfile = async (req, res) => {
  try {
    const data = {
      ...req.body,
      user: req.user.id,
    };

    if (req.file) {
      data.profilePhoto = req.file.filename;
    }

    const profile = await Profile.create(data);
    res.status(201).json(profile);
  } catch (err) {
    console.error('❌ Error:', err.message);
    res.status(400).json({ message: err.message });
  }
};

// ✅ UPDATE with image (only if user owns it)
exports.updateProfile = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.profilePhoto = req.file.filename;
    }

    const profile = await Profile.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, // only allow own profile
      data,
      { new: true }
    );

    if (!profile) return res.status(404).json({ message: 'Not found or not authorized' });
    res.json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ READ all profiles of logged-in user
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({ user: req.user.id });
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ READ one by ID (if it belongs to user)
exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findOne({ _id: req.params.id, user: req.user.id });
    if (!profile) return res.status(404).json({ message: 'Not found or not authorized' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ DELETE (only user's own profile)
exports.deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!profile) return res.status(404).json({ message: 'Not found or not authorized' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};