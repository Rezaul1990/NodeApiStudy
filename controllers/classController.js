const Class = require('../models/ClassModel');

// ✅ Create Class — based on selected user
exports.createClass = async (req, res) => {
  const { name, description } = req.body;

  if (!req.user) {
    return res.status(400).json({ message: 'User not authenticated' });
  }

  try {
    const newClass = await Class.create({
      name,
      description,
      user: req.user._id,
    });

    res.status(201).json(newClass);
  } catch (err) {
    res.status(500).json({ message: 'Error creating class', error: err.message });
  }
};

// ✅ Get all classes by user
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching classes', error: err.message });
  }
};

// ✅ Update
exports.updateClass = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updated = await Class.findByIdAndUpdate(id, { name, description }, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating class', error: err.message });
  }
};

// ✅ Delete
exports.deleteClass = async (req, res) => {
  const { id } = req.params;

  try {
    await Class.findByIdAndDelete(id);
    res.status(200).json({ message: 'Class deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting class', error: err.message });
  }
};
