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

  startDate: {
    type: Date,
    required: [true, 'Event start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'Event end date is required']
  },
  location: {
    type: String,
    required: [true, 'Event location is required'],
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    trim: true
  },
  country: {
    type: String,
    default: 'India',
    trim: true
  },
  pincode: {
    type: String,
    trim: true
  },

  fee: {
    type: Number,
    required: [true, 'Event fee is required'],
    min: [0, 'Fee cannot be negative']
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
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled', 'pending'],
    default: 'upcoming'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Creator ID is required']
  },
  images: {
    type: String,
    trim: true
  },
  requirements: {
    type: String,
    trim: true
  },
  convenience: {
    percentage: {
      type: Number,
      default: 0,
      min: 0
    },
    fixedAmount: {
      type: Number,
      default: 0,
      min: 0
    }
  },
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
    },
    ticketId: {
      type: String
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
eventSchema.methods.isFull = function () {
  return this.currentParticipants >= this.maxParticipants;
};

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;