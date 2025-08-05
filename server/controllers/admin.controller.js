const User = require('../models/user.model');
const Event = require('../models/event.model'); 
const { AppError } = require('../middlewares/errorHandler');

// Get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    
    res.status(200).json({
      status: 'success',
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// Get single user
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return next(new AppError('User not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// Create user
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError('Email already registered', 400));
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: role || 'Member'
    });

    // Remove password from output
    user.password = undefined;

    res.status(201).json({
      status: 'success',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// Update user
exports.updateUser = async (req, res, next) => {
  try {
    const { name, email, phone, role, status } = req.body;
    
    // Don't allow password updates through this route
    if (req.body.password) {
      return next(new AppError('This route is not for password updates', 400));
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, role, status },
      {
        new: true,
        runValidators: true
      }
    ).select('-password');

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// Delete user
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};

// Get all events for admin dashboard
exports.getAdminEvents = async (req, res, next) => {
  try {
    const events = await Event.find()
      .sort('-startDate')
      .select('title description startDate endDate location city state country pincode maxParticipants fee status images participants convenience');
    
    const formattedEvents = events.map(event => ({
      _id: event._id,
      title: event.title,
      description: event.description,
      startDate: event.startDate, // Map startDate to date for backward compatibility
      endDate: event.endDate,
      location: event.location,
      city: event.city,
      state: event.state, 
      country: event.country,
      pincode: event.pincode,
      currentParticipants: event.participants ? event.participants.length : 0,
      maxParticipants: event.maxParticipants,
      fee: event.fee,
      status: event.status,
      images: event.images ? [event.images] : [], // Convert single image string to array for backward compatibility
      convenience: event.convenience
    }));

    res.status(200).json({
      status: 'success',
      data: formattedEvents
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    next(error);
  }
};

// Create new event with extended data (from admin dashboard)
exports.createAdminEvent = async (req, res, next) => {
  try {
    const { 
      title, 
      description, 
      startDate, 
      endDate, 
      location, 
      city,
      state,
      country,
      pincode,
      status, 
      banner, 
      fee, 
      maxParticipants, 
      convenience
    } = req.body;

    // Validate required fields
    if (!title || !description || !startDate || !location || fee === undefined) {
      return next(new AppError('Missing required event details', 400));
    }

    // Create event with updated model structure
    const event = await Event.create({
      title,
      description,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : undefined,
      location: location.location || location, 
      city: location.city || city,
      state: location.state || state,
      country: location.country || country,
      pincode: location.pincode || pincode,
      fee: parseFloat(fee),
      maxParticipants: maxParticipants || 100, 
      status: status || 'upcoming',
      createdBy: req.user.id,
      images: banner || '', // Store as single string
      convenience: {
        percentage: convenience?.percentage || 0,
        fixedAmount: convenience?.fixedAmount || 0
      }
    });

    res.status(201).json({
      status: 'success',
      data: {
        event
      }
    });
  } catch (error) {
    console.error('Event creation error:', error);
    next(error);
  }
};

// Update existing event (for admin dashboard)
exports.updateAdminEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return next(new AppError('Invalid event ID', 400));
    }
    
    const {
      title,
      description,
      banner,
      startDate,
      endDate,
      status,
      location,
      city,
      state,
      country,
      pincode,
      fee,
      maxParticipants,
      convenience
    } = req.body;

    // Validate required fields
    if (!title || !description || !startDate || !location || fee === undefined) {
      return next(new AppError('Missing required event details', 400));
    }

    // Prepare update data
    const updateData = {
      title,
      description,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : undefined,
      location: location.location || location, 
      city: location.city || city,
      state: location.state || state,
      country: location.country || country,
      pincode: location.pincode || pincode,
      fee: parseFloat(fee),
      maxParticipants: maxParticipants || 100,
      status: status || 'upcoming',
      updatedBy: req.user.id,
      updatedAt: new Date()
    };

    // If banner is provided, update images
    if (banner) {
      updateData.images = banner; // Store as single string
    }

    // If convenience fee details provided, update them
    if (convenience) {
      updateData.convenience = {
        percentage: convenience.percentage || 0,
        fixedAmount: convenience.fixedAmount || 0
      };
    }

    // Find and update the event
    const event = await Event.findByIdAndUpdate(
      eventId,
      updateData,
      { 
        new: true, // Return the updated document
        runValidators: true // Run validators on update
      }
    );

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
    console.error('Event update error:', error);
    next(error);
  }
};