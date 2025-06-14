const Membership = require('../models/membership.model');
const User = require('../models/user.model');
const Payment = require('../models/payment.model');
const { AppError } = require('../middlewares/errorHandler');
const { logger } = require('../utils/logger');

// Purchase membership
exports.purchaseMembership = async (req, res, next) => {
  try {
    const { type, price } = req.body;
    const userId = req.user.id;

    // Check if user already has an active membership
    const existingMembership = await Membership.findOne({
      userId,
      status: 'active',
      endDate: { $gt: new Date() }
    });

    if (existingMembership) {
      return next(new AppError('You already have an active membership', 400));
    }

    // Calculate start and end dates
    const startDate = new Date();
    const endDate = new Date();
    
    if (type === 'monthly') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else if (type === 'yearly') {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    // Create new membership
    const membership = await Membership.create({
      userId,
      type,
      price,
      startDate,
      endDate,
      status: 'active',
      paymentStatus: 'paid',
      benefits: getMembershipBenefits(type)
    });

    // Update user's membership status
    await User.findByIdAndUpdate(userId, {
      membershipStatus: 'active',
      membershipType: type,
      membershipExpiry: endDate
    });

    res.status(201).json({
      status: 'success',
      data: membership
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
    const userId = req.user.id;

    const membership = await Membership.findOne({
      userId,
      status: 'active',
      endDate: { $gt: new Date() }
    }).sort('-createdAt');

    if (!membership) {
      return next(new AppError('No active membership found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: membership
    });
  } catch (error) {
    next(error);
  }
};

// Cancel membership
exports.cancelMembership = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const membership = await Membership.findOneAndUpdate(
      {
        userId,
        status: 'active',
        endDate: { $gt: new Date() }
      },
      {
        status: 'cancelled',
        autoRenew: false
      },
      { new: true }
    );

    if (!membership) {
      return next(new AppError('No active membership found', 404));
    }

    // Update user's membership status
    await User.findByIdAndUpdate(userId, {
      membershipStatus: 'cancelled'
    });

    res.status(200).json({
      status: 'success',
      data: membership
    });
  } catch (error) {
    next(error);
  }
};

// Extend membership
exports.extendMembership = async (req, res, next) => {
  try {
    const { type, price } = req.body;
    const userId = req.user.id;

    // Find current active membership
    const currentMembership = await Membership.findOne({
      userId,
      status: 'active',
      endDate: { $gt: new Date() }
    });

    if (!currentMembership) {
      return next(new AppError('No active membership found', 404));
    }

    // Calculate new end date
    const newEndDate = new Date(currentMembership.endDate);
    
    if (type === 'monthly') {
      newEndDate.setMonth(newEndDate.getMonth() + 1);
    } else if (type === 'yearly') {
      newEndDate.setFullYear(newEndDate.getFullYear() + 1);
    }

    // Update membership
    currentMembership.endDate = newEndDate;
    currentMembership.price = price;
    await currentMembership.save();

    // Update user's membership expiry
    await User.findByIdAndUpdate(userId, {
      membershipExpiry: newEndDate
    });

    res.status(200).json({
      status: 'success',
      data: currentMembership
    });
  } catch (error) {
    next(error);
  }
};

// Get membership history
exports.getMembershipHistory = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const memberships = await Membership.find({ userId })
      .sort('-createdAt')
      .limit(10);

    res.status(200).json({
      status: 'success',
      data: memberships
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to get membership benefits
const getMembershipBenefits = (type) => {
  const baseBenefits = [
    'Access to all courts',
    'Priority booking',
    'Free equipment rental',
    'Member-only events'
  ];

  if (type === 'monthly') {
    return [...baseBenefits, '10% discount on lessons'];
  } else if (type === 'yearly') {
    return [
      ...baseBenefits,
      '2 months free',
      'Exclusive tournaments',
      'Personal coach consultation',
      '20% discount on lessons',
      'Free gear bag'
    ];
  }

  return baseBenefits;
};

// Admin: Get all memberships
exports.getAllMemberships = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const memberships = await Membership.find()
      .populate('userId', 'name email phone')
      .sort('-createdAt')
      .skip(skip)
      .limit(limit);

    const total = await Membership.countDocuments();

    res.status(200).json({
      status: 'success',
      data: memberships,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Get single membership
exports.getMembership = async (req, res, next) => {
  try {
    const membership = await Membership.findById(req.params.id)
      .populate('userId', 'name email phone');

    if (!membership) {
      return next(new AppError('Membership not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: membership
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Update membership
exports.updateMembership = async (req, res, next) => {
  try {
    const { type, status, startDate, endDate, price, paymentStatus } = req.body;

    const membership = await Membership.findByIdAndUpdate(
      req.params.id,
      {
        type,
        status,
        startDate,
        endDate,
        price,
        paymentStatus
      },
      { new: true, runValidators: true }
    ).populate('userId', 'name email phone');

    if (!membership) {
      return next(new AppError('Membership not found', 404));
    }

    // Update user's membership status if membership is being updated
    if (status === 'active') {
      await User.findByIdAndUpdate(membership.userId, {
        membershipStatus: 'active',
        membershipType: type,
        membershipExpiry: endDate
      });
    } else if (status === 'cancelled' || status === 'expired') {
      await User.findByIdAndUpdate(membership.userId, {
        membershipStatus: status
      });
    }

    res.status(200).json({
      status: 'success',
      data: membership
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Delete membership
exports.deleteMembership = async (req, res, next) => {
  try {
    const membership = await Membership.findById(req.params.id);

    if (!membership) {
      return next(new AppError('Membership not found', 404));
    }

    // Update user's membership status
    await User.findByIdAndUpdate(membership.userId, {
      membershipStatus: 'none',
      membershipType: null,
      membershipExpiry: null
    });

    await Membership.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Create membership for user
exports.createMembershipForUser = async (req, res, next) => {
  try {
    const { userId, type, price, startDate, endDate } = req.body;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError('User not found', 404));
    }

    // Check if user already has an active membership
    const existingMembership = await Membership.findOne({
      userId,
      status: 'active',
      endDate: { $gt: new Date() }
    });

    if (existingMembership) {
      return next(new AppError('User already has an active membership', 400));
    }

    // Create new membership
    const membership = await Membership.create({
      userId,
      type,
      price,
      startDate: startDate || new Date(),
      endDate: endDate || new Date(),
      status: 'active',
      paymentStatus: 'paid',
      benefits: getMembershipBenefits(type)
    });

    // Update user's membership status
    await User.findByIdAndUpdate(userId, {
      membershipStatus: 'active',
      membershipType: type,
      membershipExpiry: endDate || new Date()
    });

    const populatedMembership = await Membership.findById(membership._id)
      .populate('userId', 'name email phone');

    res.status(201).json({
      status: 'success',
      data: populatedMembership
    });
  } catch (error) {
    next(error);
  }
}; 