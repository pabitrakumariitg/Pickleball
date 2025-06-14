const Booking = require('../models/booking.model');
const Court = require('../models/court.model');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all bookings
// @route   GET /api/v1/bookings
// @access  Private (Admin)
exports.getBookings = asyncHandler(async (req, res, next) => {
  const bookings = await Booking.find()
    .populate('user', 'name email')
    .populate('court', 'name')
    .populate('payment', 'status amount');

  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings
  });
});

// @desc    Get single booking
// @route   GET /api/v1/bookings/:id
// @access  Private
exports.getBooking = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id)
    .populate('user', 'name email')
    .populate('court', 'name')
    .populate('payment', 'status amount');

  if (!booking) {
    return next(new ErrorResponse(`Booking not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is booking owner or admin
  if (booking.user.toString() !== req.user.id && req.user.role !== 'Admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to view this booking`,
        401
      )
    );
  }

  res.status(200).json({
    success: true,
    data: booking
  });
});

// @desc    Create new booking
// @route   POST /api/v1/bookings
// @access  Private
exports.createBooking = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  // Check if court exists
  const court = await Court.findById(req.body.court);
  if (!court) {
    return next(new ErrorResponse(`Court not found with id of ${req.body.court}`, 404));
  }

  // Check if court is available
  const isAvailable = await court.isAvailable(req.body.startTime, req.body.endTime);
  if (!isAvailable) {
    return next(new ErrorResponse('Court is not available for the selected time slot', 400));
  }

  // Calculate total amount
  const duration = (new Date(req.body.endTime) - new Date(req.body.startTime)) / (1000 * 60 * 60);
  req.body.totalAmount = court.price * duration;

  const booking = await Booking.create(req.body);

  res.status(201).json({
    success: true,
    data: booking
  });
});

// @desc    Update booking
// @route   PUT /api/v1/bookings/:id
// @access  Private
exports.updateBooking = asyncHandler(async (req, res, next) => {
  let booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new ErrorResponse(`Booking not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is booking owner or admin
  if (booking.user.toString() !== req.user.id && req.user.role !== 'Admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this booking`,
        401
      )
    );
  }

  // Check if booking can be updated
  if (!booking.canBeCancelled()) {
    return next(new ErrorResponse('Booking cannot be updated within 24 hours of start time', 400));
  }

  booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: booking
  });
});

// @desc    Delete booking
// @route   DELETE /api/v1/bookings/:id
// @access  Private
exports.deleteBooking = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new ErrorResponse(`Booking not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is booking owner or admin
  if (booking.user.toString() !== req.user.id && req.user.role !== 'Admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this booking`,
        401
      )
    );
  }

  await booking.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get user's bookings
// @route   GET /api/v1/bookings/my-bookings
// @access  Private
exports.getMyBookings = asyncHandler(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id })
    .populate('court', 'name')
    .populate('payment', 'status amount');

  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings
  });
});

// @desc    Cancel booking
// @route   PUT /api/v1/bookings/:id/cancel
// @access  Private
exports.cancelBooking = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new ErrorResponse(`Booking not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is booking owner or admin
  if (booking.user.toString() !== req.user.id && req.user.role !== 'Admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to cancel this booking`,
        401
      )
    );
  }

  // Check if booking can be cancelled
  if (!booking.canBeCancelled()) {
    return next(new ErrorResponse('Booking cannot be cancelled within 24 hours of start time', 400));
  }

  booking.status = 'cancelled';
  booking.cancellationReason = req.body.reason;
  await booking.save();

  res.status(200).json({
    success: true,
    data: booking
  });
});

// @desc    Get user bookings
// @route   GET /api/v1/bookings/user
// @access  Private
exports.getUserBookings = asyncHandler(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id })
    .populate({
      path: 'court',
      select: 'name location'
    })
    .populate({
      path: 'user',
      select: 'name email'
    })
    .populate({
      path: 'payment',
      select: 'status amount'
    })
    .sort('-createdAt');

  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings.map(booking => ({
      _id: booking._id,
      court: {
        _id: booking.court._id,
        name: booking.court.name,
        location: booking.court.location
      },
      user: {
        _id: booking.user._id,
        name: booking.user.name,
        email: booking.user.email
      },
      startTime: booking.startTime,
      endTime: booking.endTime,
      status: booking.status,
      payment: booking.payment ? {
        _id: booking.payment._id,
        status: booking.payment.status,
        amount: booking.payment.amount
      } : undefined,
      totalAmount: booking.totalAmount,
      players: booking.players,
      notes: booking.notes,
      cancellationReason: booking.cancellationReason,
      createdAt: booking.createdAt
    }))
  });
}); 