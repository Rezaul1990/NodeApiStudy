const mongoose = require('mongoose');

const coachSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bio: { type: String },
    specialty: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Coach', coachSchema);
