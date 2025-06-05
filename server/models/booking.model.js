const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  court: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Court',
    required: [true, 'Court ID is required']
  },
  startTime: {
    type: Date,
    required: [true, 'Start time is required']
  },
  endTime: {
    type: Date,
    required: [true, 'End time is required']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required']
  },
  players: {
    type: Number,
    required: [true, 'Number of players is required'],
    min: [2, 'Minimum 2 players required'],
    max: [4, 'Maximum 4 players allowed']
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot be more than 500 characters']
  },
  cancellationReason: {
    type: String,
    maxlength: [500, 'Cancellation reason cannot be more than 500 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create indexes for faster queries
bookingSchema.index({ user: 1 });
bookingSchema.index({ court: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ startTime: 1 });
bookingSchema.index({ endTime: 1 });

// Method to check if booking is active
bookingSchema.methods.isActive = function() {
  const now = new Date();
  return this.status === 'confirmed' && this.startTime <= now && this.endTime >= now;
};

// Method to check if booking can be cancelled
bookingSchema.methods.canBeCancelled = function() {
  const now = new Date();
  const hoursUntilStart = (this.startTime - now) / (1000 * 60 * 60);
  return this.status === 'confirmed' && hoursUntilStart >= 24;
};

// Method to calculate duration in hours
bookingSchema.methods.getDuration = function() {
  return (this.endTime - this.startTime) / (1000 * 60 * 60);
};

// Method to get booking status
bookingSchema.methods.getStatus = function() {
  const now = new Date();
  
  if (this.status === 'cancelled') {
    return 'cancelled';
  }
  
  if (this.status === 'completed') {
    return 'completed';
  }
  
  if (this.endTime < now) {
    return 'completed';
  }
  
  if (this.startTime <= now && this.endTime >= now) {
    return 'active';
  }
  
  return this.status;
};

module.exports = mongoose.model('Booking', bookingSchema);