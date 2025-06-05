const { validationResult } = require('express-validator');
const { AppError } = require('./errorHandler');

exports.validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => err.msg);
    return next(new AppError(errorMessages.join('. '), 400));
  }
  next();
};

// Custom validation middleware for MongoDB ObjectId
exports.isValidObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return next(new AppError('Invalid ID format', 400));
  }
  next();
};

// Custom validation middleware for date format
exports.isValidDate = (req, res, next) => {
  const { date } = req.body;
  if (date && isNaN(Date.parse(date))) {
    return next(new AppError('Invalid date format', 400));
  }
  next();
};

// Custom validation middleware for time slot format
exports.isValidTimeSlot = (req, res, next) => {
  const { startTime, endTime } = req.body;
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

  if (startTime && !timeRegex.test(startTime)) {
    return next(new AppError('Invalid start time format (HH:MM)', 400));
  }

  if (endTime && !timeRegex.test(endTime)) {
    return next(new AppError('Invalid end time format (HH:MM)', 400));
  }

  if (startTime && endTime) {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    
    if (start >= end) {
      return next(new AppError('End time must be after start time', 400));
    }
  }

  next();
};

// Custom validation middleware for price
exports.isValidPrice = (req, res, next) => {
  const { price } = req.body;
  if (price && (isNaN(price) || price < 0)) {
    return next(new AppError('Price must be a positive number', 400));
  }
  next();
};

// Custom validation middleware for phone number
exports.isValidPhone = (req, res, next) => {
  const { phone } = req.body;
  if (phone && !/^[0-9]{10}$/.test(phone)) {
    return next(new AppError('Please enter a valid 10-digit phone number', 400));
  }
  next();
};

// Custom validation middleware for email
exports.isValidEmail = (req, res, next) => {
  const { email } = req.body;
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return next(new AppError('Please enter a valid email address', 400));
  }
  next();
};