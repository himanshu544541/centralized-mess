const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getPendingUsers,
  getAllUsers,
  updateUserStatus
} = require('../controllers/adminController');

// All admin routes require authentication and role = admin
router.use(protect);
router.use(authorize('admin'));

router.get('/pending-users', getPendingUsers);
router.get('/all-users', getAllUsers);
router.patch('/users/:id/status', updateUserStatus);

module.exports = router;

