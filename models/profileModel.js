const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String },
  phonenumber: { type: String },
  address: { type: String },
  notes: { type: String },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  agree: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String, 
    default: "",  
  },
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
