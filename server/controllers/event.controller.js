const Event = require('../models/event.model');
const User = require('../models/user.model');
const Payment = require('../models/payment.model');
const { AppError } = require('../middlewares/errorHandler');
const { logger } = require('../utils/logger');

// Create new event
exports.createEvent = async (req, res, next) => {
  try {
    const {
      title,
      description,
      date,
      location,
      fee,
      type,
      maxParticipants,
      requirements,
      images
    } = req.body;

    // Check if user is admin
    if (req.user.role !== 'admin') {
      return next(new AppError('Only admins can create events', 403));
    }

    const event = await Event.create({
      title,
      description,
      date,
      location,
      fee,
      type,
      maxParticipants,
      requirements,
      images,
      createdBy: req.user.id
    });

    res.status(201).json({
      status: 'success',
      data: {
        event
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get all events
exports.getAllEvents = async (req, res, next) => {
  try {
    const {
      type,
      status,
      date,
      page = 1,
      limit = 10
    } = req.query;

    // Build query
    const query = {};
    if (type) query.type = type;
    if (status) query.status = status;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query.date = { $gte: startDate, $lt: endDate };
    }

    const events = await Event.find(query)
      .populate('createdBy', 'name')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort('-date');

    const total = await Event.countDocuments(query);

    res.status(200).json({
      status: 'success',
      results: events.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: {
        events
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get single event
exports.getEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('createdBy', 'name')
      .populate('participants.userId', 'name email');

    if (!event) {
      return next(new AppError('Event not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        event
      }
    });
  } catch (error) {
    next(error);
  }
};

// Update event
exports.updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return next(new AppError('Event not found', 404));
    }

    // Check if user is admin
    if (req.user.role !== 'admin') {
      return next(new AppError('Only admins can update events', 403));
    }

    const updatedEvent = await Event.findByIdAndUpdate(
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
        event: updatedEvent
      }
    });
  } catch (error) {
    next(error);
  }
};

// Delete event
exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return next(new AppError('Event not found', 404));
    }

    // Check if user is admin
    if (req.user.role !== 'admin') {
      return next(new AppError('Only admins can delete events', 403));
    }

    await event.remove();

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};

// Register for event
exports.registerForEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return next(new AppError('Event not found', 404));
    }

    // Check if event is full
    if (event.isFull()) {
      return next(new AppError('Event is full', 400));
    }

    // Check if user is already registered
    const isRegistered = event.participants.some(
      p => p.userId.toString() === req.user.id
    );

    if (isRegistered) {
      return next(new AppError('You are already registered for this event', 400));
    }

    // Add participant
    await event.addParticipant(req.user.id);

    // Create payment record if event has fee
    if (event.fee > 0) {
      await Payment.create({
        userId: req.user.id,
        eventId: event._id,
        amount: event.fee,
        paymentMethod: 'razorpay',
        status: 'pending'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Successfully registered for event'
    });
  } catch (error) {
    next(error);
  }
};

// Cancel event registration
exports.cancelRegistration = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return next(new AppError('Event not found', 404));
    }

    // Check if user is registered
    const isRegistered = event.participants.some(
      p => p.userId.toString() === req.user.id
    );

    if (!isRegistered) {
      return next(new AppError('You are not registered for this event', 400));
    }

    // Remove participant
    await event.removeParticipant(req.user.id);

    // Process refund if payment was made
    const payment = await Payment.findOne({
      userId: req.user.id,
      eventId: event._id,
      status: 'success'
    });

    if (payment) {
      await payment.processRefund(event.fee, 'Event registration cancelled');
    }

    res.status(200).json({
      status: 'success',
      message: 'Successfully cancelled event registration'
    });
  } catch (error) {
    next(error);
  }
};

// Get event participants
exports.getEventParticipants = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('participants.userId', 'name email phone');

    if (!event) {
      return next(new AppError('Event not found', 404));
    }

    res.status(200).json({
      status: 'success',
      results: event.participants.length,
      data: {
        participants: event.participants
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get user's registered events
exports.getUserEvents = async (req, res, next) => {
  try {
    const events = await Event.find({
      'participants.userId': req.user.id
    })
      .populate('createdBy', 'name')
      .sort('-date');

    res.status(200).json({
      status: 'success',
      results: events.length,
      data: {
        events
      }
    });
  } catch (error) {
    next(error);
  }
}; 