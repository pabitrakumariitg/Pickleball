require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user.model');

const updateUsersMembership = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Update all users to have default membership fields
    const result = await User.updateMany(
      {
        $or: [
          { membershipStatus: { $exists: false } },
          { membershipType: { $exists: false } },
          { membershipExpiry: { $exists: false } }
        ]
      },
      {
        $set: {
          membershipStatus: 'none',
          membershipType: null,
          membershipExpiry: null
        }
      }
    );

    console.log(`Updated ${result.modifiedCount} users with membership fields`);
    process.exit(0);
  } catch (error) {
    console.error('Error updating users:', error);
    process.exit(1);
  }
};

updateUsersMembership(); 