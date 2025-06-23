const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/user.model');
const Business = require('../models/business.model');
const { logger } = require('../utils/logger');
const config = require('../config/config');

// Protect routes - verify JWT token
exports.protect = async (req, res, next) => {
  try {
    // 1) Get token from header
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      logger.error('No token provided in request');
      return res.status(401).json({
        status: 'error',
        message: 'You are not logged in. Please log in to get access.'
      });
    }

    // 2) Verify token
    const decoded = await promisify(jwt.verify)(token, config.jwt.secret);
    logger.info(`Token verified for user/business ID: ${decoded.id}, role: ${decoded.role}`);

    // 3) Check if user or business still exists based on role
    let currentUser;
    if (decoded.role === 'business') {
      currentUser = await Business.findById(decoded.id);
      if (!currentUser) {
        logger.error(`Business not found with ID: ${decoded.id}`);
        return res.status(401).json({
          status: 'error',
          message: 'The business belonging to this token no longer exists.'
        });
      }
      // Check business status
      if (currentUser.status !== 'active') {
        logger.error(`Business ${decoded.id} has inactive status: ${currentUser.status}`);
        return res.status(401).json({
          status: 'error',
          message: 'Business account is not active. Please contact support.'
        });
      }
    } else {
      currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        logger.error(`User not found with ID: ${decoded.id}`);
        return res.status(401).json({
          status: 'error',
          message: 'The user belonging to this token no longer exists.'
        });
      }
      // Check if user changed password after token was issued
      if (currentUser.changedPasswordAfter && currentUser.changedPasswordAfter(decoded.iat)) {
        logger.error(`User ${decoded.id} changed password after token was issued`);
        return res.status(401).json({
          status: 'error',
          message: 'User recently changed password. Please log in again.'
        });
      }
    }

    // Grant access to protected route
    req.user = currentUser;
    logger.info(`Access granted to ${decoded.role} with ID: ${decoded.id}`);
    next();
  } catch (error) {
    logger.error('Auth middleware error:', error);
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token. Please log in again.'
    });
  }
};

// Restrict to certain roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      logger.error(`User ${req.user.id} with role ${req.user.role} attempted to access restricted route`);
      return res.status(403).json({
        status: 'error',
        message: 'You do not have permission to perform this action'
      });
    }
    next();
  };
};

// Generate JWT token
exports.generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );
};

// Verify refresh token
exports.verifyRefreshToken = async (token) => {
  try {
    const decoded = await promisify(jwt.verify)(token, config.jwt.refreshSecret);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  } catch (error) {
    throw error;
  }
};