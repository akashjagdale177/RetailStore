const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/productController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

// Categories
router.get('/categories', getCategories);
router.post('/categories', protect, adminOnly, createCategory);
router.put('/categories/:id', protect, adminOnly, updateCategory);
router.delete('/categories/:id', protect, adminOnly, deleteCategory);

// Products
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', protect, adminOnly, createProduct);
router.put('/products/:id', protect, adminOnly, updateProduct);
router.delete('/products/:id', protect, adminOnly, deleteProduct);
router.post('/products/:id/reviews', protect, addReview);

module.exports = router;
