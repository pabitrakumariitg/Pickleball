const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Business name is required'],
    trim: true
  },
  ownerName: {
    type: String,
    required: [true, 'Owner name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[0-9]{10}$/, 'Please enter a valid phone number']
  },
  address: {
    street: {
      type: String,
      required: [true, 'Street address is required'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true
    },
    pincode: {
      type: String,
      required: [true, 'Pincode is required'],
      match: [/^[0-9]{6}$/, 'Please enter a valid pincode']
    }
  },
  courtsOwned: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Court'
  }],
  role: {
    type: String,
    enum: ['business'],
    default: 'business'
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'suspended', 'inactive'],
    default: 'pending'
  },
  documents: [{
    type: {
      type: String,
      enum: ['license', 'tax-certificate', 'insurance', 'other'],
      required: true
    },
    url: {
      type: String,
      required: true
    },
    verified: {
      type: Boolean,
      default: false
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  bankDetails: {
    accountNumber: {
      type: String,
      trim: true
    },
    ifscCode: {
      type: String,
      trim: true
    },
    accountHolderName: {
      type: String,
      trim: true
    },
    upiId: {
      type: String,
      trim: true
    }
  },
  commission: {
    type: Number,
    default: 10, // Default commission percentage
    min: 0,
    max: 100
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 0,
      max: 5
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
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
businessSchema.index({ email: 1 });
businessSchema.index({ status: 1 });
businessSchema.index({ 'address.city': 1 });
businessSchema.index({ 'address.state': 1 });

// Method to calculate average rating
businessSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) return 0;
  const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
  this.rating = sum / this.reviews.length;
  return this.rating;
};

// Method to add court
businessSchema.methods.addCourt = async function(courtId) {
  if (!this.courtsOwned.includes(courtId)) {
    this.courtsOwned.push(courtId);
    await this.save();
  }
};

// Method to remove court
businessSchema.methods.removeCourt = async function(courtId) {
  this.courtsOwned = this.courtsOwned.filter(id => id.toString() !== courtId.toString());
  await this.save();
};

// Method to verify document
businessSchema.methods.verifyDocument = async function(documentType) {
  const document = this.documents.find(doc => doc.type === documentType);
  if (document) {
    document.verified = true;
    await this.save();
  }
};

// Password comparison method
businessSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Hash password before saving
businessSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Business = mongoose.model('Business', businessSchema);

module.exports = Business; 