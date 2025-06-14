const User = require('../models/user.model');
const { AppError } = require('./errorHandler');

// Check if user has active membership
exports.requireMembership = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user.hasActiveMembership()) {
      return next(new AppError('Active membership required for this action', 403));
    }
    
    next();
  } catch (error) {
    next(error);
  }
};

// Optional membership check - adds membership info to request
exports.checkMembership = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    req.user.hasMembership = user.hasActiveMembership();
    req.user.membershipType = user.membershipType;
    req.user.membershipExpiry = user.membershipExpiry;
    next();
  } catch (error) {
    next(error);
  }
}; 