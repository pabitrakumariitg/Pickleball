const Business = require('../models/business.model');
const Court = require('../models/court.model');
const { AppError } = require('../middlewares/errorHandler');
const { logger } = require('../utils/logger');
const { uploadPhoto } = require('../utils/cloudinary');

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
      bankDetails
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
      bankDetails
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