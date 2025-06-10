const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getCourts,
  getCourt,
  createCourt,
  updateCourt,
  deleteCourt,
  getCourtBookings,
  getCourtAvailability,
  selectTimeSlot,
  releaseTimeSlot
} = require('../controllers/court.controller');

router
  .route('/')
  .get(getCourts)
  .post(protect, authorize('business', 'admin'), createCourt);

router
  .route('/:id')
  .get(getCourt)
  .put(protect, authorize('business', 'admin'), updateCourt)
  .delete(protect, authorize('business', 'admin'), deleteCourt);

router.get('/:id/bookings', protect, getCourtBookings);
router.get('/:id/availability', getCourtAvailability);
router.post('/:id/select-slot', protect, selectTimeSlot);
router.delete('/:id/release-slot', protect, releaseTimeSlot);

module.exports = router; 