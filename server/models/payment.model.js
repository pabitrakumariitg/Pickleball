const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  membershipId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Membership'
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  currency: {
    type: String,
    default: 'INR',
    uppercase: true
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'debit_card', 'net_banking', 'upi', 'cash'],
    required: [true, 'Payment method is required']
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed', 'refunded'],
    default: 'pending'
  },
  transactionId: {
    type: String,
    required: [true, 'Transaction ID is required'],
    unique: true
  },
  paymentDetails: {
    method: String,
    status: String,
    transactionTime: {
      type: Date,
      default: Date.now
    },
    notes: String
  },
  refundAmount: {
    type: Number,
    min: 0
  },
  refundReason: {
    type: String,
    trim: true
  },
  refundDate: {
    type: Date
  },
  relatedTo: {
    type: {
      type: String,
      enum: ['booking', 'membership', 'event'],
      required: [true, 'Related type is required']
    },
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Related ID is required']
    }
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
paymentSchema.index({ userId: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ transactionId: 1 });
paymentSchema.index({ createdAt: 1 });
paymentSchema.index({ 'relatedTo.type': 1, 'relatedTo.id': 1 });

// Method to process refund
paymentSchema.methods.processRefund = async function(amount, reason) {
  if (this.status !== 'success') {
    throw new Error('Can only refund successful payments');
  }

  if (amount > this.amount) {
    throw new Error('Refund amount cannot exceed payment amount');
  }

  this.refundAmount = amount;
  this.refundReason = reason;
  this.refundDate = new Date();
  this.status = 'refunded';
  await this.save();
};

// Method to get payment status
paymentSchema.methods.getStatus = function() {
  return {
    status: this.status,
    amount: this.amount,
    currency: this.currency,
    transactionId: this.transactionId,
    createdAt: this.createdAt,
    refundAmount: this.refundAmount,
    refundDate: this.refundDate
  };
};

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;