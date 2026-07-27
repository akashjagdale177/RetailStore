const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  getStats,
} = require('../controllers/orderController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

router.use(protect);

router.get('/admin/all', adminOnly, getAllOrders);
router.get('/admin/stats', adminOnly, getStats);
router.put('/:id/status', adminOnly, updateOrderStatus);

router.post('/', createOrder);
router.get('/', getMyOrders);
router.get('/:id', getOrderById);

module.exports = router;
