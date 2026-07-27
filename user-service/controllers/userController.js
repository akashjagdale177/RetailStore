const User = require('../models/User');
const asyncHandler = require('../middlewares/asyncHandler');

const getOrCreateProfile = async (req) => {
  let profile = await User.findOne({ authId: req.user.id });
  if (!profile) {
    profile = await User.create({
      authId: req.user.id,
      name: req.user.name || 'User',
      email: req.user.email || `${req.user.id}@retailstore.local`,
      role: req.user.role || 'customer',
    });
  }
  return profile;
};

// @desc  Get my profile (auto-creates on first access)
// @route GET /users/profile
const getProfile = asyncHandler(async (req, res) => {
  const profile = await getOrCreateProfile(req);
  res.json({ success: true, data: profile });
});

// @desc  Update my profile
// @route PUT /users/profile
const updateProfile = asyncHandler(async (req, res) => {
  const profile = await getOrCreateProfile(req);
  const { name, phone } = req.body;
  if (name) profile.name = name;
  if (phone) profile.phone = phone;
  await profile.save();
  res.json({ success: true, message: 'Profile updated', data: profile });
});

// @desc  Add an address
// @route POST /users/addresses
const addAddress = asyncHandler(async (req, res) => {
  const profile = await getOrCreateProfile(req);
  profile.addresses.push(req.body);
  await profile.save();
  res.status(201).json({ success: true, message: 'Address added', data: profile });
});

// @desc  Delete an address
// @route DELETE /users/addresses/:addressId
const deleteAddress = asyncHandler(async (req, res) => {
  const profile = await getOrCreateProfile(req);
  profile.addresses = profile.addresses.filter((a) => a._id.toString() !== req.params.addressId);
  await profile.save();
  res.json({ success: true, message: 'Address removed', data: profile });
});

// @desc  Toggle wishlist item
// @route POST /users/wishlist/:productId
const toggleWishlist = asyncHandler(async (req, res) => {
  const profile = await getOrCreateProfile(req);
  const { productId } = req.params;
  if (profile.wishlist.includes(productId)) {
    profile.wishlist = profile.wishlist.filter((id) => id !== productId);
  } else {
    profile.wishlist.push(productId);
  }
  await profile.save();
  res.json({ success: true, message: 'Wishlist updated', data: profile });
});

// ---- Admin user management ----

// @desc  List all users (admin)
// @route GET /users/admin/all
const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, search = '' } = req.query;
  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.max(1, Number(limit));
  const query = search ? { name: { $regex: search, $options: 'i' } } : {};

  const [users, total] = await Promise.all([
    User.find(query).sort({ createdAt: -1 }).skip((pageNum - 1) * limitNum).limit(limitNum),
    User.countDocuments(query),
  ]);

  res.json({ success: true, data: users, pagination: { total, page: pageNum, pages: Math.ceil(total / limitNum) || 1 } });
});

// @desc  Block / unblock a user (admin)
// @route PUT /users/admin/:id/block
const toggleBlockUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  user.isBlocked = !user.isBlocked;
  await user.save();
  res.json({ success: true, message: `User ${user.isBlocked ? 'blocked' : 'unblocked'}`, data: user });
});

module.exports = {
  getProfile,
  updateProfile,
  addAddress,
  deleteAddress,
  toggleWishlist,
  getAllUsers,
  toggleBlockUser,
};
