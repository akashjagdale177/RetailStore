const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    user: { type: String, required: true, index: true },
    type: { type: String, enum: ['order', 'account', 'promo'], default: 'order' },
    title: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
