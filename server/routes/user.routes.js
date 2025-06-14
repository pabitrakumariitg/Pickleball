const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.middleware');
const { validateRequest } = require('../middlewares/validation.middleware');

const router = express.Router();

// Validation middleware
const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/\d/)
    .withMessage('Password must contain a number'),
  body('phone')
    .matches(/^[0-9]{10}$/)
    .withMessage('Please enter a valid 10-digit phone number')
];

const loginValidation = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

const updateProfileValidation = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('phone')
    .optional()
    .matches(/^[0-9]{10}$/)
    .withMessage('Please enter a valid 10-digit phone number')
];

const changePasswordValidation = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long')
    .matches(/\d/)
    .withMessage('New password must contain a number')
];

// Public routes
router.post('/register', registerValidation, validateRequest, userController.register);
router.post('/login', loginValidation, validateRequest, userController.login);

// Protected routes
router.use(protect); // All routes after this middleware require authentication

router.get('/profile', userController.getProfile);
router.get('/membership-status', userController.getMembershipStatus);
router.put(
  '/profile/update',
  updateProfileValidation,
  validateRequest,
  userController.updateProfile
);
router.put(
  '/change-password',
  changePasswordValidation,
  validateRequest,
  userController.changePassword
);
router.delete('/delete-account', userController.deleteAccount);

module.exports = router;