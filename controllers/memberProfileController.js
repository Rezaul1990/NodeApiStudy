const MemberProfile = require('../models/memberProfile');

exports.createMemberProfile = async (req, res) => {
  try {
    const profile = new MemberProfile(req.body);
    await profile.save();
    res.status(201).json({ message: 'Member profile created', profile });
  } catch (error) {
    console.error('[Create Member] Error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getAllMemberProfiles = async (req, res) => {
    try {
      const profiles = await MemberProfile.find();
      res.status(200).json(profiles);
    } catch (error) {
      console.error('[Get All Members] Error:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  };
