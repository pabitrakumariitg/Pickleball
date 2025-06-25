const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middlewares/auth.middleware');
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
  .post(protect, restrictTo('Admin','business'), createCourt);

router
  .route('/:id')
  .get(getCourt)
  .put(protect, restrictTo('Admin','business'), updateCourt)
  .delete(protect, restrictTo('Admin','business'), deleteCourt);

router.get('/:id/bookings', protect, getCourtBookings);
router.get('/:id/availability', getCourtAvailability);
router.post('/:id/select-slot', protect, selectTimeSlot);
router.delete('/:id/release-slot', protect, releaseTimeSlot);

module.exports = router; 