const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  registerBusiness,
  getBusinessProfile,
  updateBusinessProfile,
  getDashboard,
  uploadDocuments,
  getReviews,
  updateBankDetails,
  getEarnings
} = require('../controllers/business.controller');

// Public routes
router.post('/register', registerBusiness);

// Protected routes
router.use(protect);
router.use(authorize('business'));

router.get('/dashboard', getDashboard);
router.get('/profile', getBusinessProfile);
router.put('/profile', updateBusinessProfile);
router.post('/documents', uploadDocuments);
router.get('/reviews', getReviews);
router.put('/bank-details', updateBankDetails);
router.get('/earnings', getEarnings);

module.exports = router;