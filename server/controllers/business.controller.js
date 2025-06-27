const Business = require('../models/business.model');
const Court = require('../models/court.model');
const { AppError } = require('../middlewares/errorHandler');
const { logger } = require('../utils/logger');
const { uploadPhoto } = require('../utils/cloudinary');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { protect, authorize } = require('../middlewares/auth.middleware');



// Register business
exports.registerBusiness = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      company,
      phone,
      address,
      bankDetails,
      ownerName
    } = req.body;

    // Check if business already exists
    const existingBusiness = await Business.findOne({ email });
    if (existingBusiness) {
      return next(new AppError('Email already registered', 400));
    }

    const business = await Business.create({
      name,
      email,
      password,
      company,
      phone,
      address,
      bankDetails,
      ownerName
    });

    // Remove password from output
    business.password = undefined;

    res.status(201).json({
      status: 'success',
      data: {
        business
      }
    });
  } catch (error) {
    next(error);
  }
};

// Login business
exports.loginBusiness = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }

    // Check if business exists and password is correct
    const business = await Business.findOne({ email }).select('+password');
    if (!business || !(await business.comparePassword(password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: business._id, role: business.role },
      process.env.JWT_SECRET,
      { expiresIn: config.jwt.expiresIn }
    );

    // Remove password from output
    business.password = undefined;

    res.status(200).json({
      status: 'success',
      token,
      data: {
        business
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get business profile
exports.getBusinessProfile = async (req, res, next) => {
  try {
    const business = await Business.findById(req.user.id)
      .select('-password')
      .populate('courtsOwned');

    if (!business) {
      return next(new AppError('Business not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        business
      }
    });
  } catch (error) {
    next(error);
  }
};

// Update business profile
exports.updateBusinessProfile = async (req, res, next) => {
  try {
    // Don't allow password updates through this route
    if (req.body.password) {
      return next(new AppError('This route is not for password updates', 400));
    }

    const business = await Business.findByIdAndUpdate(
      req.user.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).select('-password');

    if (!business) {
      return next(new AppError('Business not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        business
      }
    });
  } catch (error) {
    next(error);
  }
};

// Upload business documents
exports.uploadDocuments = async (req, res, next) => {
  try {
    if (!req.files || !req.files.document) {
      return next(new AppError('Please upload a document', 400));
    }

    const { type } = req.body;
    const file = req.files.document;

    // Upload to cloudinary using the new utility function
    const result = await uploadPhoto(file, 'business-documents', {
      resource_type: 'auto',
      context: {
        description: `Business document - ${type}`,
        uploaded_by: req.user.id
      }
    });

    // Add document to business profile
    const business = await Business.findById(req.user.id);
    business.documents.push({
      type,
      url: result.url,
      uploadedAt: Date.now()
    });

    await business.save();

    res.status(200).json({
      status: 'success',
      data: {
        document: business.documents[business.documents.length - 1]
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get business dashboard
exports.getDashboard = async (req, res, next) => {
  console.log("getDashboard", req.user);
  try {
    const business = await Business.findById(req.user.id)
      .populate({
        path: 'courtsOwned',
        select: 'name location rating reviews'
      });

    if (!business) {
      return next(new AppError('Business not found', 404));
    }

    // Calculate total revenue
    const courts = await Court.find({ ownerId: req.user.id });
    const totalRevenue = courts.reduce((acc, court) => {
      return acc + (court.price.member + court.price.nonMember) / 2;
    }, 0);

    // Calculate average rating
    const averageRating = business.courtsOwned.reduce((acc, court) => {
      return acc + (court.rating || 0);
    }, 0) / (business.courtsOwned.length || 1);

    res.status(200).json({
      status: 'success',
      data: {
        business,
        stats: {
          totalCourts: business.courtsOwned.length,
          totalRevenue,
          averageRating
        }
      }
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Get business reviews
exports.getReviews = async (req, res, next) => {
  try {
    const business = await Business.findById(req.user.id)
      .populate('reviews.userId', 'name');

    if (!business) {
      return next(new AppError('Business not found', 404));
    }

    res.status(200).json({
      status: 'success',
      results: business.reviews.length,
      data: {
        reviews: business.reviews
      }
    });
  } catch (error) {
    next(error);
  }
};

// Update bank details
exports.updateBankDetails = async (req, res, next) => {
  try {
    const { accountNumber, ifscCode, accountHolderName } = req.body;

    const business = await Business.findById(req.user.id);
    if (!business) {
      return next(new AppError('Business not found', 404));
    }

    business.bankDetails = {
      accountNumber,
      ifscCode,
      accountHolderName
    };

    await business.save();

    res.status(200).json({
      status: 'success',
      data: {
        bankDetails: business.bankDetails
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get business earnings
exports.getEarnings = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const query = { ownerId: req.user.id };
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const courts = await Court.find(query);
    const totalEarnings = courts.reduce((acc, court) => {
      return acc + (court.price.member + court.price.nonMember) / 2;
    }, 0);

    res.status(200).json({
      status: 'success',
      data: {
        totalEarnings,
        period: {
          startDate,
          endDate
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Forgot password (business)
exports.forgotPasswordBusiness = async (req, res, next) => {
  try {
    const { email } = req.body;
    const business = await Business.findOne({ email });
    if (!business) {
      return next(new AppError('No business found with that email', 404));
    }
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
    business.resetPasswordToken = resetTokenHash;
    business.resetPasswordExpire = Date.now() + 60 * 60 * 1000; // 1 hour
    await business.save({ validateBeforeSave: false });
    const resetUrl = `${process.env.FRONTEND_URL}/business/reset-password/${resetToken}`;
    const message = `You requested a password reset. Please use the following link to reset your password: ${resetUrl}`;
    await sendEmail({
      email: business.email,
      subject: 'Pickleball Business Password Reset',
      message
    });
    res.status(200).json({ status: 'success', message: 'Reset email sent' });
  } catch (error) {
    next(error);
  }
};

// Reset password (business)
exports.resetPasswordBusiness = async (req, res, next) => {
  try {
    const resetTokenHash = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const business = await Business.findOne({
      resetPasswordToken: resetTokenHash,
      resetPasswordExpire: { $gt: Date.now() }
    });
    if (!business) {
      return next(new AppError('Invalid or expired token', 400));
    }
    business.password = req.body.password;
    business.resetPasswordToken = undefined;
    business.resetPasswordExpire = undefined;
    await business.save();
    res.status(200).json({ status: 'success', message: 'Password reset successful' });
  } catch (error) {
    next(error);
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Try to find user in User model
      let user = await User.findById(decoded.id).select('-password');
      if (!user) {
        // Try to find user in Business model
        user = await Business.findById(decoded.id).select('-password');
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'User not found'
        });
      }

      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error in authentication'
    });
  }
}; 