const mongoose = require('mongoose');

const temporarySelectionSchema = new mongoose.Schema({
  court: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Court',
    required: [true, 'Court ID is required']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  startTime: {
    type: Date,
    required: [true, 'Start time is required']
  },
  endTime: {
    type: Date,
    required: [true, 'End time is required']
  },
  expiresAt: {
    type: Date,
    required: [true, 'Expiry time is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create indexes for faster queries
temporarySelectionSchema.index({ court: 1, startTime: 1, endTime: 1 });
temporarySelectionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Create a TTL index to automatically remove expired selections
temporarySelectionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('TemporarySelection', temporarySelectionSchema); 