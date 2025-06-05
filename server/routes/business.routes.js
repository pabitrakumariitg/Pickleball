 const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// Business routes will be added here
router.get('/', (req, res) => {
  res.status(200).json({ success: true, data: 'Business routes are working' });
});

module.exports = router;