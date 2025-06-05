const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  purchaseMembership,
  verifyPayment,
  getMembershipStatus,
  cancelMembership,
  extendMembership,
  getMembershipHistory
} = require('../controllers/membership.controller');

// Membership purchase and management routes
router.post('/purchase', protect, purchaseMembership);
router.post('/verify-payment', protect, verifyPayment);
router.get('/status', protect, getMembershipStatus);
router.put('/cancel', protect, cancelMembership);
router.put('/extend', protect, extendMembership);
router.get('/history', protect, getMembershipHistory);

module.exports = router;