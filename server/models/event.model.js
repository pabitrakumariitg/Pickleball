const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Event date is required']
  },
  location: {
    type: String,
    required: [true, 'Event location is required'],
    trim: true
  },
  fee: {
    type: Number,
    required: [true, 'Event fee is required'],
    min: [0, 'Fee cannot be negative']
  },
  registrationLink: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['tournament', 'clinic', 'community-game', 'workshop'],
    required: [true, 'Event type is required']
  },
  maxParticipants: {
    type: Number,
    required: [true, 'Maximum participants is required'],
    min: [1, 'Maximum participants must be at least 1']
  },
  currentParticipants: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Creator ID is required']
  },
  images: [{
    type: String,
    trim: true
  }],
  requirements: [{
    type: String,
    trim: true
  }],
  participants: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    registrationDate: {
      type: Date,
      default: Date.now
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid'],
      default: 'pending'
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for faster queries
eventSchema.index({ date: 1 });
eventSchema.index({ status: 1 });
eventSchema.index({ type: 1 });
eventSchema.index({ createdBy: 1 });

// Method to check if event is full
eventSchema.methods.isFull = function() {
  return this.currentParticipants >= this.maxParticipants;
};

// Method to add participant
eventSchema.methods.addParticipant = async function(userId) {
  if (this.isFull()) {
    throw new Error('Event is full');
  }

  const isAlreadyRegistered = this.participants.some(
    p => p.userId.toString() === userId.toString()
  );

  if (isAlreadyRegistered) {
    throw new Error('User is already registered for this event');
  }

  this.participants.push({
    userId,
    registrationDate: Date.now()
  });

  this.currentParticipants += 1;
  await this.save();
};

// Method to remove participant
eventSchema.methods.removeParticipant = async function(userId) {
  const participantIndex = this.participants.findIndex(
    p => p.userId.toString() === userId.toString()
  );

  if (participantIndex === -1) {
    throw new Error('User is not registered for this event');
  }

  this.participants.splice(participantIndex, 1);
  this.currentParticipants -= 1;
  await this.save();
};

const Event = mongoose.model('Event', eventSchema);

module.exports = Event; 