const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  addAddress,
  deleteAddress,
  toggleWishlist,
  getAllUsers,
  toggleBlockUser,
} = require('../controllers/userController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

router.use(protect);

router.get('/admin/all', adminOnly, getAllUsers);
router.put('/admin/:id/block', adminOnly, toggleBlockUser);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/addresses', addAddress);
router.delete('/addresses/:addressId', deleteAddress);
router.post('/wishlist/:productId', toggleWishlist);

module.exports = router;
