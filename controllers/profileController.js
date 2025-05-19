const Profile = require('../models/profileModel');

// CREATE with image
exports.createProfile = async (req, res) => {
  try {
    const data = req.body;

    // Multer file error (you can also try-catch req.file check separately)
    if (req.file) {
      data.profilePhoto = req.file.filename;
    }

    const profile = await Profile.create(data);
    res.status(201).json(profile);
  } catch (err) {
    console.error('❌ Multer or Mongoose Error:', err.message);
    res.status(400).json({ message: err.message });
  }
};

// UPDATE with image
exports.updateProfile = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.profilePhoto = req.file.filename;
    }

    const profile = await Profile.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!profile) return res.status(404).json({ message: "Not found" });
    res.json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// READ ALL
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ ONE
exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ message: "Not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// DELETE
exports.deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);
    if (!profile) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
