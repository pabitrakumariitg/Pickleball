const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  cancelRegistration,
  getEventParticipants
} = require('../controllers/event.controller');

router
  .route('/')
  .get(getAllEvents)
  .post(protect, authorize('business', 'admin'), createEvent);

router
  .route('/:id')
  .get(getEvent)
  .put(protect, authorize('business', 'admin'), updateEvent)
  .delete(protect, authorize('business', 'admin'), deleteEvent);

router.post('/:id/register', protect, registerForEvent);
router.delete('/:id/register', protect, cancelRegistration);
router.get('/:id/participants', protect, getEventParticipants);

module.exports = router; 