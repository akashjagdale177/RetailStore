const Notification = require('../models/Notification');
const asyncHandler = require('../middlewares/asyncHandler');

// @desc  Create a notification (called internally by other services, e.g. order-service)
// @route POST /notifications
const createNotification = asyncHandler(async (req, res) => {
  const { user, type, title, message } = req.body;
  if (!user || !title || !message) {
    return res.status(400).json({ success: false, message: 'user, title and message are required' });
  }
  const notification = await Notification.create({ user, type, title, message });
  res.status(201).json({ success: true, data: notification });
});

// @desc  Get my notifications
// @route GET /notifications
const getMyNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(50);
  res.json({ success: true, data: notifications });
});

// @desc  Mark a notification as read
// @route PUT /notifications/:id/read
const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  if (!notification) return res.status(404).json({ success: false, message: 'Notification not found' });
  res.json({ success: true, data: notification });
});

module.exports = { createNotification, getMyNotifications, markAsRead };
