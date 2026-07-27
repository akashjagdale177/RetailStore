const Cart = require('../models/Cart');
const asyncHandler = require('../middlewares/asyncHandler');

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  return cart;
};

// @desc  Get logged-in user's cart
// @route GET /cart
const getCart = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user.id);
  res.json({ success: true, data: cart });
});

// @desc  Add item to cart (or increase quantity if it exists)
// @route POST /cart
const addToCart = asyncHandler(async (req, res) => {
  const { productId, name, image, price, quantity = 1 } = req.body;
  if (!productId || !name || price === undefined) {
    return res.status(400).json({ success: false, message: 'productId, name and price are required' });
  }

  const cart = await getOrCreateCart(req.user.id);
  const existing = cart.items.find((i) => i.productId === productId);
  if (existing) {
    existing.quantity += Number(quantity);
  } else {
    cart.items.push({ productId, name, image, price, quantity });
  }
  await cart.save();
  res.status(201).json({ success: true, message: 'Item added to cart', data: cart });
});

// @desc  Update quantity of a cart item
// @route PUT /cart/:productId
const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const cart = await getOrCreateCart(req.user.id);
  const item = cart.items.find((i) => i.productId === req.params.productId);
  if (!item) return res.status(404).json({ success: false, message: 'Item not in cart' });

  if (quantity <= 0) {
    cart.items = cart.items.filter((i) => i.productId !== req.params.productId);
  } else {
    item.quantity = quantity;
  }
  await cart.save();
  res.json({ success: true, message: 'Cart updated', data: cart });
});

// @desc  Remove item from cart
// @route DELETE /cart/:productId
const removeFromCart = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user.id);
  cart.items = cart.items.filter((i) => i.productId !== req.params.productId);
  await cart.save();
  res.json({ success: true, message: 'Item removed from cart', data: cart });
});

// @desc  Clear the entire cart (called after successful checkout)
// @route DELETE /cart
const clearCart = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user.id);
  cart.items = [];
  await cart.save();
  res.json({ success: true, message: 'Cart cleared', data: cart });
});

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
