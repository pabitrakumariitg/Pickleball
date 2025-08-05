const multer = require('multer');
const path = require('path');
const AppError = require('../utils/appError');
const cloudinary = require('../config/cloudinary');

// Configure multer for memory storage (for Cloudinary upload)
const storage = multer.memoryStorage();

// File filter function
const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

// Create multer upload instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

// Middleware for handling payment screenshot upload
exports.uploadPaymentScreenshot = upload.single('paymentScreenshot');

// Middleware to upload file to Cloudinary
exports.uploadToCloudinary = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new AppError('Payment screenshot is required.', 400));
    }

    // Convert buffer to base64
    const base64Data = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64Data, {
      folder: 'pickleball/payments',
      resource_type: 'auto'
    });

    // Add Cloudinary URL to request body
    req.body.paymentScreenshot = result.secure_url;
    
    next();
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    return next(new AppError('Error uploading image to Cloudinary', 500));
  }
};

// Error handler for multer errors
exports.handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return next(new AppError('File too large! Maximum size is 5MB.', 400));
    }
    return next(new AppError(`Upload error: ${err.message}`, 400));
  }
  next(err);
};
