const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
  getMyBookings,
  cancelBooking,
  getUserBookings
} = require('../controllers/booking.controller');

// Put specific routes first
router.get('/user', protect, getUserBookings);
router.get('/my-bookings', protect, getMyBookings);

// Then put parameter routes
router
  .route('/')
  .get(protect, authorize('admin'), getBookings)
  .post(protect, createBooking);

router
  .route('/:id')
  .get(protect, getBooking)
  .put(protect, updateBooking)
  .delete(protect, deleteBooking);

router.put('/:id/cancel', protect, cancelBooking);

module.exports = router; 