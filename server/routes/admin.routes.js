const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Business = require('../models/business.model');
const User = require('../models/user.model');

// Admin routes
router.get('/dashboard', protect, authorize('admin'), async (req, res) => {
  try {
    const stats = await Business.aggregate([
      {
        $group: {
          _id: null,
          totalBusinesses: { $sum: 1 },
          activeBusinesses: {
            $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
          },
          totalRevenue: { $sum: '$revenue' }
        }
      }
    ]);

    res.json({
      success: true,
      data: stats[0] || {
        totalBusinesses: 0,
        activeBusinesses: 0,
        totalRevenue: 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching admin dashboard data'
    });
  }
});

router.get('/stats', protect, authorize('admin'), async (req, res) => {
  try {
    const [userStats, businessStats] = await Promise.all([
      User.aggregate([
        {
          $group: {
            _id: null,
            totalUsers: { $sum: 1 },
            activeUsers: {
              $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
            }
          }
        }
      ]),
      Business.aggregate([
        {
          $group: {
            _id: null,
            totalBusinesses: { $sum: 1 },
            activeBusinesses: {
              $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
            },
            totalRevenue: { $sum: '$revenue' }
          }
        }
      ])
    ]);

    res.json({
      success: true,
      data: {
        ...userStats[0] || { totalUsers: 0, activeUsers: 0 },
        ...businessStats[0] || {
          totalBusinesses: 0,
          activeBusinesses: 0,
          totalRevenue: 0
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching admin statistics'
    });
  }
});

// Get all businesses
router.get('/businesses', protect, authorize('admin'), async (req, res) => {
  try {
    const businesses = await Business.find()
      .select('-documents')
      .sort('-createdAt');

    res.json({
      success: true,
      data: businesses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching businesses'
    });
  }
});

// Update business status
router.patch('/businesses/:id/status', protect, authorize('admin'), async (req, res) => {
  try {
    const { status } = req.body;
    const business = await Business.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!business) {
      return res.status(404).json({
        success: false,
        error: 'Business not found'
      });
    }

    res.json({
      success: true,
      data: business
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error updating business status'
    });
  }
});

// Get business documents
router.get('/businesses/:id/documents', protect, authorize('admin'), async (req, res) => {
  try {
    const business = await Business.findById(req.params.id)
      .select('documents');

    if (!business) {
      return res.status(404).json({
        success: false,
        error: 'Business not found'
      });
    }

    res.json({
      success: true,
      data: business.documents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching business documents'
    });
  }
});

// Verify business documents
router.post('/businesses/:id/verify-documents', protect, authorize('admin'), async (req, res) => {
  try {
    const { documentId, status, remarks } = req.body;
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({
        success: false,
        error: 'Business not found'
      });
    }

    const document = business.documents.id(documentId);
    if (!document) {
      return res.status(404).json({
        success: false,
        error: 'Document not found'
      });
    }

    document.verificationStatus = status;
    document.verificationRemarks = remarks;
    document.verifiedAt = new Date();
    document.verifiedBy = req.user.id;

    await business.save();

    res.json({
      success: true,
      data: document
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error verifying documents'
    });
  }
});

module.exports = router; 