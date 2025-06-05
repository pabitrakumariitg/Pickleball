const Court = require('../models/court.model');
const Business = require('../models/business.model');
const { AppError } = require('../middlewares/errorHandler');
const { logger } = require('../utils/logger');
const Booking = require('../models/booking.model');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// Create new court
exports.createCourt = async (req, res, next) => {
  try {
    const {
      name,
      location,
      venueType,
      slotsAvailable,
      price,
      equipmentRental,
      images,
      amenities
    } = req.body;

    // Check if business exists and is active
    const business = await Business.findById(req.user.id);
    if (!business || business.status !== 'active') {
      return next(new AppError('Business account not found or inactive', 404));
    }

    const court = await Court.create({
      name,
      location,
      venueType,
      slotsAvailable,
      price,
      equipmentRental,
      images,
      amenities,
      ownerId: req.user.id
    });

    // Add court to business's courtsOwned array
    await business.addCourt(court._id);

    res.status(201).json({
      status: 'success',
      data: {
        court
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get all courts
exports.getAllCourts = async (req, res, next) => {
  try {
    const {
      venueType,
      location,
      minPrice,
      maxPrice,
      equipmentRental,
      page = 1,
      limit = 10
    } = req.query;

    // Build query
    const query = { isActive: true };
    if (venueType) query.venueType = venueType;
    if (location) query.location = { $regex: location, $options: 'i' };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = minPrice;
      if (maxPrice) query.price.$lte = maxPrice;
    }
    if (equipmentRental) query.equipmentRental = equipmentRental === 'true';

    // Execute query with pagination
    const courts = await Court.find(query)
      .populate('ownerId', 'name company')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort('-createdAt');

    // Get total count for pagination
    const total = await Court.countDocuments(query);

    res.status(200).json({
      status: 'success',
      results: courts.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: {
        courts
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get single court
exports.getCourt = async (req, res, next) => {
  try {
    const court = await Court.findById(req.params.id)
      .populate('ownerId', 'name company phone')
      .populate('reviews.userId', 'name');

    if (!court) {
      return next(new AppError('Court not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        court
      }
    });
  } catch (error) {
    next(error);
  }
};

// Update court
exports.updateCourt = async (req, res, next) => {
  try {
    const court = await Court.findById(req.params.id);

    if (!court) {
      return next(new AppError('Court not found', 404));
    }

    // Check if user is the owner
    if (court.ownerId.toString() !== req.user.id) {
      return next(new AppError('You are not authorized to update this court', 403));
    }

    const updatedCourt = await Court.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        court: updatedCourt
      }
    });
  } catch (error) {
    next(error);
  }
};

// Delete court
exports.deleteCourt = async (req, res, next) => {
  try {
    const court = await Court.findById(req.params.id);

    if (!court) {
      return next(new AppError('Court not found', 404));
    }

    // Check if user is the owner
    if (court.ownerId.toString() !== req.user.id) {
      return next(new AppError('You are not authorized to delete this court', 403));
    }

    // Soft delete
    court.isActive = false;
    await court.save();

    // Remove court from business's courtsOwned array
    const business = await Business.findById(req.user.id);
    if (business) {
      await business.removeCourt(court._id);
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};

// Add court review
exports.addReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const court = await Court.findById(req.params.id);

    if (!court) {
      return next(new AppError('Court not found', 404));
    }

    // Check if user has already reviewed
    const existingReview = court.reviews.find(
      review => review.userId.toString() === req.user.id
    );

    if (existingReview) {
      return next(new AppError('You have already reviewed this court', 400));
    }

    // Add review
    court.reviews.push({
      userId: req.user.id,
      rating,
      comment
    });

    // Update average rating
    const totalRating = court.reviews.reduce((acc, review) => acc + review.rating, 0);
    court.rating = totalRating / court.reviews.length;

    await court.save();

    res.status(201).json({
      status: 'success',
      data: {
        review: court.reviews[court.reviews.length - 1]
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get court availability
exports.getAvailability = async (req, res, next) => {
  try {
    const { date } = req.query;
    const court = await Court.findById(req.params.id);

    if (!court) {
      return next(new AppError('Court not found', 404));
    }

    // Filter slots for the given date
    const availableSlots = court.slotsAvailable.filter(slot => !slot.isBooked);

    res.status(200).json({
      status: 'success',
      data: {
        date,
        availableSlots
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all courts
// @route   GET /api/v1/courts
// @access  Public
exports.getCourts = asyncHandler(async (req, res, next) => {
  const courts = await Court.find().populate('business', 'name email');

  res.status(200).json({
    success: true,
    count: courts.length,
    data: courts
  });
});

// @desc    Get single court
// @route   GET /api/v1/courts/:id
// @access  Public
exports.getCourt = asyncHandler(async (req, res, next) => {
  const court = await Court.findById(req.params.id).populate('business', 'name email');

  if (!court) {
    return next(new ErrorResponse(`Court not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: court
  });
});

// @desc    Create new court
// @route   POST /api/v1/courts
// @access  Private (Business/Admin)
exports.createCourt = asyncHandler(async (req, res, next) => {
  // Add business to req.body
  req.body.business = req.user.id;

  const court = await Court.create(req.body);

  res.status(201).json({
    success: true,
    data: court
  });
});

// @desc    Update court
// @route   PUT /api/v1/courts/:id
// @access  Private (Business/Admin)
exports.updateCourt = asyncHandler(async (req, res, next) => {
  let court = await Court.findById(req.params.id);

  if (!court) {
    return next(new ErrorResponse(`Court not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is court owner or admin
  if (court.business.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this court`,
        401
      )
    );
  }

  court = await Court.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: court
  });
});

// @desc    Delete court
// @route   DELETE /api/v1/courts/:id
// @access  Private (Business/Admin)
exports.deleteCourt = asyncHandler(async (req, res, next) => {
  const court = await Court.findById(req.params.id);

  if (!court) {
    return next(new ErrorResponse(`Court not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is court owner or admin
  if (court.business.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this court`,
        401
      )
    );
  }

  await court.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get court bookings
// @route   GET /api/v1/courts/:id/bookings
// @access  Private
exports.getCourtBookings = asyncHandler(async (req, res, next) => {
  const bookings = await Booking.find({ court: req.params.id })
    .populate('user', 'name email')
    .populate('court', 'name');

  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings
  });
});

// @desc    Get court availability
// @route   GET /api/v1/courts/:id/availability
// @access  Public
exports.getCourtAvailability = asyncHandler(async (req, res, next) => {
  const { date } = req.query;
  if (!date) {
    return next(new ErrorResponse('Please provide a date', 400));
  }

  const startDate = new Date(date);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(date);
  endDate.setHours(23, 59, 59, 999);

  const bookings = await Booking.find({
    court: req.params.id,
    startTime: { $gte: startDate, $lte: endDate }
  });

  // Get court details
  const court = await Court.findById(req.params.id);
  if (!court) {
    return next(new ErrorResponse(`Court not found with id of ${req.params.id}`, 404));
  }

  // Generate time slots
  const timeSlots = [];
  const startHour = court.openingTime.getHours();
  const endHour = court.closingTime.getHours();

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const slotTime = new Date(date);
      slotTime.setHours(hour, minute, 0, 0);

      const isBooked = bookings.some(booking => {
        const bookingStart = new Date(booking.startTime);
        const bookingEnd = new Date(booking.endTime);
        return slotTime >= bookingStart && slotTime < bookingEnd;
      });

      timeSlots.push({
        time: slotTime,
        available: !isBooked
      });
    }
  }

  res.status(200).json({
    success: true,
    data: timeSlots
  });
}); 