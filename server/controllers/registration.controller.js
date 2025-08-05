const Registration = require('../models/registration.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Create a new registration
exports.createRegistration = catchAsync(async (req, res, next) => {
  // Check for duplicate registrations
  // const existingRegistration = await Registration.findOne({
  //   $or: [
  //     { 'player1.email': req.body.player1.email },
  //     { 'player1.email': req.body.player2.email },
  //     { 'player2.email': req.body.player1.email },
  //     { 'player2.email': req.body.player2.email }
  //   ]
  // });

  // if (existingRegistration) {
  //   return next(new AppError('One or both players are already registered for this event', 400));
  // }

  // Create registration based on the updated model
  const registration = await Registration.create({
    teamName: req.body.teamName,
    player1: req.body.player1,
    player2: req.body.player2,
    category: req.body.category,
    paymentScreenshot: req.body.paymentScreenshot // This will be the Cloudinary URL
  });

  res.status(201).json({
    status: 'success',
    data: registration
  });
});

// Get all registrations (admin only)
exports.getAllRegistrations = catchAsync(async (req, res, next) => {
  const registrations = await Registration.find();

  res.status(200).json({
    status: 'success',
    results: registrations.length,
    data: registrations
  });
});

// This route is no longer relevant with the new model, but we'll keep it for now
// and have it return all registrations.
exports.getRegistrationsByEvent = catchAsync(async (req, res, next) => {
  const registrations = await Registration.find();

  res.status(200).json({
    status: 'success',
    results: registrations.length,
    data: registrations
  });
});

// Get registration by ID
exports.getRegistration = catchAsync(async (req, res, next) => {
  const registration = await Registration.findById(req.params.id);

  if (!registration) {
    return next(new AppError('Registration not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: registration
  });
});

// Update payment status (admin only)
exports.updatePaymentStatus = catchAsync(async (req, res, next) => {
  const { paymentStatus } = req.body;

  if (!['pending', 'verified', 'rejected'].includes(paymentStatus)) {
    return next(new AppError('Invalid payment status', 400));
  }

  const registration = await Registration.findByIdAndUpdate(
    req.params.id,
    { paymentStatus },
    { new: true, runValidators: true }
  );

  if (!registration) {
    return next(new AppError('Registration not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: registration
  });
});

// Cancel registration
exports.cancelRegistration = catchAsync(async (req, res, next) => {
  const registration = await Registration.findByIdAndDelete(req.params.id);

  if (!registration) {
    return next(new AppError('Registration not found', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// Get registration statistics (admin only)
exports.getRegistrationStats = catchAsync(async (req, res, next) => {
  const stats = await Registration.aggregate([
    {
      $group: {
        _id: null, // Group all registrations together
        totalRegistrations: { $sum: 1 },
        verifiedPayments: {
          $sum: {
            $cond: [{ $eq: ['$paymentStatus', 'verified'] }, 1, 0]
          }
        },
        pendingPayments: {
          $sum: {
            $cond: [{ $eq: ['$paymentStatus', 'pending'] }, 1, 0]
          }
        },
        rejectedPayments: {
          $sum: {
            $cond: [{ $eq: ['$paymentStatus', 'rejected'] }, 1, 0]
          }
        }
      }
    },
    {
        $project: {
            _id: 0
        }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: stats[0] || { totalRegistrations: 0, verifiedPayments: 0, pendingPayments: 0, rejectedPayments: 0 }
  });
});
