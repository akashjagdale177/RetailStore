const Order = require('../models/Order');
const asyncHandler = require('../middlewares/asyncHandler');

// @desc  Place a new order
// @route POST /orders
const createOrder = asyncHandler(async (req, res) => {
  const { products, address, paymentMethod } = req.body;
  if (!products || !products.length || !address) {
    return res.status(400).json({ success: false, message: 'products and address are required' });
  }

  const subtotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const tax = Math.round(subtotal * 0.05); // 5% flat tax for demo purposes
  const discount = 0;
  const total = subtotal + tax - discount;

  const order = await Order.create({
    user: req.user.id,
    products,
    address,
    paymentMethod: paymentMethod || 'COD',
    subtotal,
    tax,
    discount,
    total,
  });

  res.status(201).json({ success: true, message: 'Order placed successfully', data: order });
});

// @desc  Get logged-in user's orders
// @route GET /orders
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json({ success: true, data: orders });
});

// @desc  Get single order (owner or admin)
// @route GET /orders/:id
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  if (order.user !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Not authorized to view this order' });
  }
  res.json({ success: true, data: order });
});

// @desc  Get all orders (admin)
// @route GET /orders/admin/all
const getAllOrders = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.max(1, Number(limit));

  const [orders, total] = await Promise.all([
    Order.find().sort({ createdAt: -1 }).skip((pageNum - 1) * limitNum).limit(limitNum),
    Order.countDocuments(),
  ]);

  res.json({ success: true, data: orders, pagination: { total, page: pageNum, pages: Math.ceil(total / limitNum) || 1 } });
});

// @desc  Update order status (admin)
// @route PUT /orders/:id/status
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { shippingStatus, paymentStatus } = req.body;
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

  if (shippingStatus) order.shippingStatus = shippingStatus;
  if (paymentStatus) order.paymentStatus = paymentStatus;
  await order.save();

  res.json({ success: true, message: 'Order status updated', data: order });
});

// @desc  Basic revenue / stats for admin dashboard
// @route GET /orders/admin/stats
const getStats = asyncHandler(async (req, res) => {
  const totalOrders = await Order.countDocuments();
  const revenueAgg = await Order.aggregate([
    { $match: { paymentStatus: 'paid' } },
    { $group: { _id: null, revenue: { $sum: '$total' } } },
  ]);
  const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);

  res.json({
    success: true,
    data: {
      totalOrders,
      revenue: revenueAgg[0]?.revenue || 0,
      recentOrders,
    },
  });
});

module.exports = { createOrder, getMyOrders, getOrderById, getAllOrders, updateOrderStatus, getStats };
