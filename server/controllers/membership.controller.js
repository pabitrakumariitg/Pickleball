const Membership = require('../models/membership.model');
const User = require('../models/user.model');
const Payment = require('../models/payment.model');
const { AppError } = require('../middlewares/errorHandler');
const { logger } = require('../utils/logger');

// Purchase membership
exports.purchaseMembership = async (req, res, next) => {
  try {
    const { type, paymentMethod = 'cash' } = req.body;

    // Check if user already has an active membership
    const existingMembership = await Membership.findOne({
      userId: req.user.id,
      status: 'active'
    });

    if (existingMembership) {
      return next(new AppError('You already have an active membership', 400));
    }

    // Calculate price based on type
    const price = type === 'monthly' ? 500 : 5000; // Example prices

    // Create membership
    const membership = await Membership.create({
      userId: req.user.id,
      type,
      price,
      status: 'pending'
    });

    // Create payment record
    const payment = await Payment.create({
      userId: req.user.id,
      membershipId: membership._id,
      amount: price,
      paymentMethod,
      status: 'pending',
      transactionId: `MEM_${Date.now()}`,
      paymentDetails: {
        method: paymentMethod,
        status: 'pending'
      }
    });

    // For demo purposes, auto-approve non-cash payments
    if (paymentMethod !== 'cash') {
      payment.status = 'success';
      payment.paymentDetails.status = 'success';
      await payment.save();

      membership.status = 'active';
      await membership.save();

      await User.findByIdAndUpdate(req.user.id, {
        membershipStatus: 'member'
      });
    }

    res.status(201).json({
      status: 'success',
      data: {
        membership,
        payment
      }
    });
  } catch (error) {
    next(error);
  }
};

// Verify payment (placeholder for future payment integration)
exports.verifyPayment = async (req, res, next) => {
  try {
    const { paymentId } = req.body;

    // Update payment status
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return next(new AppError('Payment not found', 404));
    }

    payment.status = 'success';
    payment.paymentDetails.status = 'success';
    await payment.save();

    // Update membership status
    const membership = await Membership.findById(payment.membershipId);
    if (!membership) {
      return next(new AppError('Membership not found', 404));
    }

    membership.status = 'active';
    await membership.save();

    // Update user membership status
    await User.findByIdAndUpdate(req.user.id, {
      membershipStatus: 'member'
    });

    res.status(200).json({
      status: 'success',
      data: {
        membership,
        payment
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get membership status
exports.getMembershipStatus = async (req, res, next) => {
  try {
    const membership = await Membership.findOne({
      userId: req.user.id,
      status: 'active'
    });

    if (!membership) {
      return res.status(200).json({
        status: 'success',
        data: {
          membershipStatus: 'non-member'
        }
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        membership
      }
    });
  } catch (error) {
    next(error);
  }
};

// Cancel membership
exports.cancelMembership = async (req, res, next) => {
  try {
    const membership = await Membership.findOne({
      userId: req.user.id,
      status: 'active'
    });

    if (!membership) {
      return next(new AppError('No active membership found', 404));
    }

    await membership.cancel();

    // Update user membership status
    await User.findByIdAndUpdate(req.user.id, {
      membershipStatus: 'non-member'
    });

    res.status(200).json({
      status: 'success',
      message: 'Membership cancelled successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Extend membership
exports.extendMembership = async (req, res, next) => {
  try {
    const { months } = req.body;
    const membership = await Membership.findOne({
      userId: req.user.id,
      status: 'active'
    });

    if (!membership) {
      return next(new AppError('No active membership found', 404));
    }

    await membership.extend(months);

    res.status(200).json({
      status: 'success',
      data: {
        membership
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get membership history
exports.getMembershipHistory = async (req, res, next) => {
  try {
    const memberships = await Membership.find({
      userId: req.user.id
    })
      .sort('-createdAt');

    res.status(200).json({
      status: 'success',
      results: memberships.length,
      data: {
        memberships
      }
    });
  } catch (error) {
    next(error);
  }
}; 