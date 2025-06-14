const User = require('../models/user.model');
const { AppError } = require('../middlewares/errorHandler');

// Get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    
    res.status(200).json({
      status: 'success',
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// Get single user
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return next(new AppError('User not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// Create user
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError('Email already registered', 400));
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: role || 'Member'
    });

    // Remove password from output
    user.password = undefined;

    res.status(201).json({
      status: 'success',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// Update user
exports.updateUser = async (req, res, next) => {
  try {
    const { name, email, phone, role, status } = req.body;
    
    // Don't allow password updates through this route
    if (req.body.password) {
      return next(new AppError('This route is not for password updates', 400));
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, role, status },
      {
        new: true,
        runValidators: true
      }
    ).select('-password');

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// Delete user
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
}; 