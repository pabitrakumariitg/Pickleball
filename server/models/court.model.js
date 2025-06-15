const mongoose = require('mongoose');

const courtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a court name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  venue: {
    type: String,
    required: [true, 'Please add a venue name'],
    trim: true,
    maxlength: [100, 'Venue name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  type: {
    type: String,
    required: [true, 'Please specify court type'],
    enum: ['indoor', 'outdoor']
  },
  surface: {
    type: String,
    required: [true, 'Please specify court surface'],
    enum: ['concrete', 'asphalt', 'wood', 'synthetic']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price per hour']
  },
  capacity: {
    type: Number,
    required: [true, 'Please specify court capacity'],
    min: [2, 'Capacity must be at least 2 players'],
    max: [4, 'Capacity cannot be more than 4 players']
  },
  openingTime: {
    type: Date,
    required: [true, 'Please specify opening time']
  },
  closingTime: {
    type: Date,
    required: [true, 'Please specify closing time']
  },
  amenities: [{
    type: String,
    enum: ['parking', 'showers', 'lockers', 'equipment_rental', 'cafe', 'wifi']
  }],
  image: {
    type: String,
    default: null
  },
  images: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['active', 'maintenance', 'inactive'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create index for faster queries
courtSchema.index({ business: 1 });
courtSchema.index({ status: 1 });
courtSchema.index({ type: 1 });
courtSchema.index({ surface: 1 });

// Method to check if court is available at a given time
courtSchema.methods.isAvailable = async function(startTime, endTime) {
  const Booking = mongoose.model('Booking');
  
  const conflictingBooking = await Booking.findOne({
    court: this._id,
    $or: [
      {
        startTime: { $lt: endTime },
        endTime: { $gt: startTime }
      }
    ]
  });

  return !conflictingBooking;
};

// Method to get court's daily schedule
courtSchema.methods.getDailySchedule = async function(date) {
  const Booking = mongoose.model('Booking');
  
  const startDate = new Date(date);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(date);
  endDate.setHours(23, 59, 59, 999);

  const bookings = await Booking.find({
    court: this._id,
    startTime: { $gte: startDate, $lte: endDate }
  }).sort('startTime');

  return bookings;
};

module.exports = mongoose.model('Court', courtSchema);