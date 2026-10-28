const User = require('../models/User');
const StudentProfile = require('../models/StudentProfile');
const Mess = require('../models/Mess');

// @desc    Get all pending users (students and vendors) waiting for verification
// @route   GET /api/admin/pending-users
// @access  Private (Admin only)
exports.getPendingUsers = async (req, res) => {
  try {
    const pendingUsers = await User.find({ status: 'pending' }).select('-password').sort({ createdAt: -1 });

    const enrichedUsers = await Promise.all(
      pendingUsers.map(async (u) => {
        let details = null;
        if (u.role === 'student') {
          details = await StudentProfile.findOne({ user: u._id });
        } else if (u.role === 'vendor') {
          details = await Mess.findOne({ vendor: u._id });
        }
        return {
          ...u.toObject(),
          details
        };
      })
    );

    res.status(200).json({
      count: enrichedUsers.length,
      users: enrichedUsers
    });
  } catch (error) {
    console.error('[Admin Pending Users Error]', error);
    res.status(500).json({ error: error.message || 'Error fetching pending users.' });
  }
};

// @desc    Get all platform users
// @route   GET /api/admin/all-users
// @access  Private (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });

    const enrichedUsers = await Promise.all(
      users.map(async (u) => {
        let details = null;
        if (u.role === 'student') {
          details = await StudentProfile.findOne({ user: u._id });
        } else if (u.role === 'vendor') {
          details = await Mess.findOne({ vendor: u._id });
        }
        return {
          ...u.toObject(),
          details
        };
      })
    );

    res.status(200).json({
      count: enrichedUsers.length,
      users: enrichedUsers
    });
  } catch (error) {
    console.error('[Admin All Users Error]', error);
    res.status(500).json({ error: error.message || 'Error fetching all users.' });
  }
};

// @desc    Update user approval status (Approve or Reject)
// @route   PATCH /api/admin/users/:id/status
// @access  Private (Admin only)
exports.updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, rejectionReason } = req.body;

    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ error: 'Status must be approved, rejected, or pending.' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    user.status = status;
    if (status === 'rejected') {
      user.rejectionReason = rejectionReason || 'Information provided could not be verified.';
    } else if (status === 'approved') {
      user.rejectionReason = '';
    }

    await user.save();

    res.status(200).json({
      message: `User ${user.name} (${user.role}) has been ${status}.`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        rejectionReason: user.rejectionReason
      }
    });
  } catch (error) {
    console.error('[Admin Update User Status Error]', error);
    res.status(500).json({ error: error.message || 'Error updating user verification status.' });
  }
};

