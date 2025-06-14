require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user.model');

const updateAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Update existing user to admin
    const updatedUser = await User.findOneAndUpdate(
      { email: 'admin@pickleball.com' },
      { 
        role: 'Admin',
        status: 'Active'
      },
      { new: true }
    );

    if (!updatedUser) {
      console.log('User not found');
      process.exit(1);
    }

    console.log('User updated successfully:', updatedUser);
    process.exit(0);
  } catch (error) {
    console.error('Error updating user:', error);
    process.exit(1);
  }
};

updateAdmin(); 