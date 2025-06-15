const { 
  uploadPhoto, 
  uploadMultiplePhotos, 
  deletePhoto, 
  getPhotoInfo, 
  getResponsiveUrls 
} = require('../utils/cloudinary');
const { AppError } = require('../middlewares/errorHandler');
const { logger } = require('../utils/logger');

// Upload single photo
exports.uploadPhoto = async (req, res, next) => {
  try {
    if (!req.files || !req.files.photo) {
      return next(new AppError('Please upload a photo', 400));
    }

    const { folder = 'pickleball', description } = req.body;
    const file = req.files.photo;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      return next(new AppError('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed', 400));
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return next(new AppError('File size too large. Maximum size is 10MB', 400));
    }

    // Upload to Cloudinary
    const result = await uploadPhoto(file, folder, {
      context: {
        description: description || 'Uploaded photo',
        uploaded_by: req.user.id
      }
    });

    logger.info(`Photo uploaded successfully: ${result.public_id} by user ${req.user.id}`);

    res.status(200).json({
      status: 'success',
      data: {
        photo: result
      }
    });
  } catch (error) {
    logger.error(`Photo upload failed: ${error.message}`);
    next(error);
  }
};

// Upload multiple photos
exports.uploadMultiplePhotos = async (req, res, next) => {
  try {
    if (!req.files || !req.files.photos) {
      return next(new AppError('Please upload photos', 400));
    }

    const { folder = 'pickleball', description } = req.body;
    const files = Array.isArray(req.files.photos) ? req.files.photos : [req.files.photos];

    // Validate files
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    for (const file of files) {
      if (!allowedTypes.includes(file.mimetype)) {
        return next(new AppError(`Invalid file type for ${file.name}. Only JPEG, PNG, GIF, and WebP are allowed`, 400));
      }
      if (file.size > maxSize) {
        return next(new AppError(`File ${file.name} is too large. Maximum size is 10MB`, 400));
      }
    }

    // Upload to Cloudinary
    const results = await uploadMultiplePhotos(files, folder, {
      context: {
        description: description || 'Uploaded photos',
        uploaded_by: req.user.id
      }
    });

    logger.info(`${results.length} photos uploaded successfully by user ${req.user.id}`);

    res.status(200).json({
      status: 'success',
      data: {
        photos: results
      }
    });
  } catch (error) {
    logger.error(`Multiple photo upload failed: ${error.message}`);
    next(error);
  }
};

// Delete photo
exports.deletePhoto = async (req, res, next) => {
  try {
    const { publicId } = req.params;

    if (!publicId) {
      return next(new AppError('Public ID is required', 400));
    }

    const result = await deletePhoto(publicId);

    logger.info(`Photo deleted successfully: ${publicId} by user ${req.user.id}`);

    res.status(200).json({
      status: 'success',
      data: {
        message: 'Photo deleted successfully',
        result
      }
    });
  } catch (error) {
    logger.error(`Photo deletion failed: ${error.message}`);
    next(error);
  }
};

// Get photo info
exports.getPhotoInfo = async (req, res, next) => {
  try {
    const { publicId } = req.params;

    if (!publicId) {
      return next(new AppError('Public ID is required', 400));
    }

    const photoInfo = await getPhotoInfo(publicId);

    res.status(200).json({
      status: 'success',
      data: {
        photo: photoInfo
      }
    });
  } catch (error) {
    logger.error(`Get photo info failed: ${error.message}`);
    next(error);
  }
};

// Get responsive URLs for a photo
exports.getResponsiveUrls = async (req, res, next) => {
  try {
    const { publicId } = req.params;

    if (!publicId) {
      return next(new AppError('Public ID is required', 400));
    }

    const urls = getResponsiveUrls(publicId);

    res.status(200).json({
      status: 'success',
      data: {
        urls
      }
    });
  } catch (error) {
    logger.error(`Get responsive URLs failed: ${error.message}`);
    next(error);
  }
};

// Upload profile picture
exports.uploadProfilePicture = async (req, res, next) => {
  try {
    if (!req.files || !req.files.photo) {
      return next(new AppError('Please upload a photo', 400));
    }

    const file = req.files.photo;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      return next(new AppError('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed', 400));
    }

    // Validate file size (5MB max for profile pictures)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return next(new AppError('File size too large. Maximum size is 5MB', 400));
    }

    // Upload to Cloudinary with profile picture specific settings
    const result = await uploadPhoto(file, 'profile-pictures', {
      transformation: [
        { width: 400, height: 400, crop: 'fill', gravity: 'face' },
        { quality: 'auto:good' },
        { fetch_format: 'auto' }
      ],
      context: {
        description: 'Profile picture',
        uploaded_by: req.user.id
      }
    });

    logger.info(`Profile picture uploaded successfully: ${result.public_id} by user ${req.user.id}`);

    res.status(200).json({
      status: 'success',
      data: {
        photo: result
      }
    });
  } catch (error) {
    logger.error(`Profile picture upload failed: ${error.message}`);
    next(error);
  }
};

// Upload court images
exports.uploadCourtImages = async (req, res, next) => {
  try {
    if (!req.files || !req.files.photos) {
      return next(new AppError('Please upload court images', 400));
    }

    const { courtId } = req.body;
    const files = Array.isArray(req.files.photos) ? req.files.photos : [req.files.photos];

    // Validate files
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    for (const file of files) {
      if (!allowedTypes.includes(file.mimetype)) {
        return next(new AppError(`Invalid file type for ${file.name}. Only JPEG, PNG, GIF, and WebP are allowed`, 400));
      }
      if (file.size > maxSize) {
        return next(new AppError(`File ${file.name} is too large. Maximum size is 10MB`, 400));
      }
    }

    // Upload to Cloudinary with court-specific settings
    const results = await uploadMultiplePhotos(files, 'court-images', {
      transformation: [
        { quality: 'auto:good' },
        { fetch_format: 'auto' }
      ],
      context: {
        description: 'Court images',
        court_id: courtId,
        uploaded_by: req.user.id
      }
    });

    logger.info(`${results.length} court images uploaded successfully for court ${courtId} by user ${req.user.id}`);

    res.status(200).json({
      status: 'success',
      data: {
        photos: results
      }
    });
  } catch (error) {
    logger.error(`Court images upload failed: ${error.message}`);
    next(error);
  }
}; 