const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middlewares/auth.middleware');
const {
  registerBusiness,
  loginBusiness,
  forgotPasswordBusiness,
  resetPasswordBusiness,
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
router.post('/login', loginBusiness);
router.post('/forgot-password', forgotPasswordBusiness);
router.put('/reset-password/:token', resetPasswordBusiness);

// Protected routes
router.use(protect);
router.use(restrictTo('business'));

router.get('/dashboard', getDashboard);
router.get('/profile', getBusinessProfile);
router.put('/profile', updateBusinessProfile);
router.post('/documents', uploadDocuments);
router.get('/reviews', getReviews);
router.put('/bank-details', updateBankDetails);
router.get('/earnings', getEarnings);

module.exports = router;