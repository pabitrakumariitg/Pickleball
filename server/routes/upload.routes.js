const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  uploadPhoto,
  uploadMultiplePhotos,
  deletePhoto,
  getPhotoInfo,
  getResponsiveUrls,
  uploadProfilePicture,
  uploadCourtImages
} = require('../controllers/upload.controller');

// All routes require authentication
router.use(protect);

// Upload single photo
router.post('/photo', uploadPhoto);

// Upload multiple photos
router.post('/photos', uploadMultiplePhotos);

// Upload profile picture
router.post('/profile-picture', uploadProfilePicture);

// Upload court images
router.post('/court-images', uploadCourtImages);

// Get photo info
router.get('/photo/:publicId', getPhotoInfo);

// Get responsive URLs for a photo
router.get('/photo/:publicId/urls', getResponsiveUrls);

// Delete photo
router.delete('/photo/:publicId', deletePhoto);

module.exports = router; 