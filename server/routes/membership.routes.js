const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middlewares/auth.middleware');
const {
  purchaseMembership,
  getMembershipStatus,
  getMembershipHistory,
  cancelMembership,
  extendMembership,
  getAllMemberships,
  getMembership,
  updateMembership,
  deleteMembership,
  createMembershipForUser
} = require('../controllers/membership.controller');

// All routes require authentication
router.use(protect);

// Membership purchase and management routes
router.post('/purchase', purchaseMembership);
router.get('/status', getMembershipStatus);
router.get('/history', getMembershipHistory);
router.put('/cancel', cancelMembership);
router.put('/extend', extendMembership);

// Admin routes - require admin role
router.use(restrictTo('Admin'));

// Admin membership management routes
router.route('/')
  .get(getAllMemberships)
  .post(createMembershipForUser);

router.route('/:id')
  .get(getMembership)
  .put(updateMembership)
  .delete(deleteMembership);

module.exports = router;