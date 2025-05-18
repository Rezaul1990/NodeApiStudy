const mongoose = require('mongoose');

const MemberProfileSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dob: {
    day: String,
    month: String,
    year: String
  },
  phone: String,
  email: String,
  nok: {
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    relationship: String
  },
}, { timestamps: true });

module.exports = mongoose.model('MemberProfile', MemberProfileSchema);
