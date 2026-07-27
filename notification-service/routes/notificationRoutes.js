const express = require('express');
const router = express.Router();
const { createNotification, getMyNotifications, markAsRead } = require('../controllers/notificationController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', createNotification); // internal, called by other services
router.get('/', protect, getMyNotifications);
router.put('/:id/read', protect, markAsRead);

module.exports = router;
