const Coach = require('../models/Coach');

// CREATE
exports.createCoach = async (req, res) => {
  const { name, bio, specialty } = req.body;

  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const coach = await Coach.create({
      name,
      bio,
      specialty,
      user: req.user._id,
    });
    res.status(201).json(coach);
  } catch (err) {
    res.status(500).json({ message: 'Error creating coach', error: err.message });
  }
};

// READ (all for logged-in user)
exports.getCoaches = async (req, res) => {
  try {
    const coaches = await Coach.find();
    res.status(200).json(coaches);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching coaches', error: err.message });
  }
};

// UPDATE
exports.updateCoach = async (req, res) => {
  const { id } = req.params;
  const { name, bio, specialty } = req.body;

  try {
    const updated = await Coach.findByIdAndUpdate(
      id,
      { name, bio, specialty },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating coach', error: err.message });
  }
};

// DELETE
exports.deleteCoach = async (req, res) => {
  const { id } = req.params;

  try {
    await Coach.findByIdAndDelete(id);
    res.status(200).json({ message: 'Coach deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting coach', error: err.message });
  }
};
