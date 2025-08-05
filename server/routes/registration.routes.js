const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registration.controller');
const { protect, authorize } = require('../middleware/auth');

// Protected routes (require authentication)
router.post('/', registrationController.createRegistration);
router.get('/event/:eventId', protect, registrationController.getRegistrationsByEvent);
router.get('/:id', protect, registrationController.getRegistration);
router.delete('/:id', protect, registrationController.cancelRegistration);

// Admin only routes
router.get('/',  registrationController.getAllRegistrations);
router.patch('/:id/payment-status', protect, authorize('admin'), registrationController.updatePaymentStatus);
router.get('/stats', protect, authorize('admin'), registrationController.getRegistrationStats);

module.exports = router;
