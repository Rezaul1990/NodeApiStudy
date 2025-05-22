const Class = require('../models/ClassModel');

// ✅ Create Class — based on selected user
exports.createClass = async (req, res) => {
  const { name, description, cost, date, startTime, endTime, coachIds } = req.body;

  if (!req.user) {
    return res.status(400).json({ message: 'User not authenticated' });
  }

  if (!name || !cost || !date || !startTime || !endTime || !Array.isArray(coachIds) || coachIds.length === 0) {
  return res.status(400).json({ message: 'Missing required fields or coaches' });
}

  try {
    const newClass = await Class.create({
      name,
      description,
      cost,
      date,
      startTime,
      endTime,
      user: req.user._id,
      coaches: coachIds,
    });

    res.status(201).json(newClass);
  } catch (err) {
    res.status(500).json({
      message: 'Error creating class',
      error: err.message,
    });
  }
};


// ✅ Get all classes by user
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find({})
      .populate('coaches', 'name specialty bio')  
      .populate('user', 'email');

    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching classes', error: err.message });
  }
};

// ✅ Update class
exports.updateClass = async (req, res) => {
  const { id } = req.params;
  const { name, description, cost, date, startTime, endTime, coachIds } = req.body;

  try {
    const updated = await Class.findByIdAndUpdate(
      id,
      {
        name,
        description,
        cost,
        date,
        startTime,
        endTime,
       coaches: coachIds,
      },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({
      message: 'Error updating class',
      error: err.message,
    });
  }
};


// ✅ Delete class
exports.deleteClass = async (req, res) => {
  const { id } = req.params;

  try {
    await Class.findByIdAndDelete(id);
    res.status(200).json({ message: 'Class deleted' });
  } catch (err) {
    res.status(500).json({
      message: 'Error deleting class',
      error: err.message,
    });
  }
};

// ✅ Enroll in a class
exports.enrollInClass = async (req, res) => {
  const { classId } = req.params;

  try {
    const classDoc = await Class.findById(classId);
    if (!classDoc) return res.status(404).json({ message: 'Class not found' });

    if (classDoc.enrolledUsers.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already enrolled' });
    }

    classDoc.enrolledUsers.push(req.user._id);
    await classDoc.save();

    res.status(200).json({ message: 'Successfully enrolled' });
  } catch (err) {
    res.status(500).json({ message: 'Error enrolling in class', error: err.message });
  }
};

// ✅ Get all enrolled classes for current user
exports.getMyEnrolledClasses = async (req, res) => {
  try {
    const classes = await Class.find({ enrolledUsers: req.user._id })
      .populate('coaches', 'name')
      .populate('user', 'email');
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching enrolled classes', error: err.message });
  }
};

// ✅ Admin: See classes with enrolled users
// ✅ Admin: See all classes with enrolled users
exports.getClassesWithEnrollments = async (req, res) => {
  try {
    const classes = await Class.find({ enrolledUsers: { $exists: true, $not: { $size: 0 } } })
      .populate('coaches', 'name')
      .populate('enrolledUsers', 'name email');

    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching enrolled classes',
      error: err.message,
    });
  }
};


