require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user.model');

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      phone: '1234567890',
      role: 'Admin',
      status: 'Active'
    });

    console.log('Admin user created successfully:', adminUser);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdmin(); 