const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  cost: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    required: true, 
  },

  startTime: {
    type: Date,
    required: true,
  },

  endTime: {
    type: Date,
    required: true,
  },
  coaches: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coach',
    }],

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);
