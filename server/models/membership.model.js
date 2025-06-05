const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  type: {
    type: String,
    enum: ['monthly', 'yearly'],
    required: [true, 'Membership type is required']
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'cancelled'],
    default: 'active'
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
    default: Date.now
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  paymentId: {
    type: String,
    trim: true
  },
  benefits: [{
    type: String,
    trim: true
  }],
  autoRenew: {
    type: Boolean,
    default: false
  },
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
membershipSchema.index({ userId: 1 });
membershipSchema.index({ status: 1 });
membershipSchema.index({ endDate: 1 });

// Method to check if membership is active
membershipSchema.methods.isActive = function() {
  const now = new Date();
  return this.status === 'active' && now <= this.endDate;
};

// Method to calculate remaining days
membershipSchema.methods.getRemainingDays = function() {
  const now = new Date();
  const end = new Date(this.endDate);
  const diffTime = end - now;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Method to extend membership
membershipSchema.methods.extend = async function(months) {
  const currentEndDate = new Date(this.endDate);
  currentEndDate.setMonth(currentEndDate.getMonth() + months);
  this.endDate = currentEndDate;
  this.status = 'active';
  await this.save();
};

// Method to cancel membership
membershipSchema.methods.cancel = async function() {
  this.status = 'cancelled';
  this.autoRenew = false;
  await this.save();
};

// Pre-save middleware to set end date based on type
membershipSchema.pre('save', function(next) {
  if (this.isNew) {
    const startDate = new Date(this.startDate);
    if (this.type === 'monthly') {
      startDate.setMonth(startDate.getMonth() + 1);
    } else if (this.type === 'yearly') {
      startDate.setFullYear(startDate.getFullYear() + 1);
    }
    this.endDate = startDate;
  }
  next();
});

const Membership = mongoose.model('Membership', membershipSchema);

module.exports = Membership; 