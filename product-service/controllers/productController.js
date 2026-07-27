const Product = require('../models/Product');
const Category = require('../models/Category');
const asyncHandler = require('../middlewares/asyncHandler');

// @desc  Get products with search, filters, sorting & pagination
// @route GET /products
const getProducts = asyncHandler(async (req, res) => {
  const {
    search,
    category,
    minPrice,
    maxPrice,
    sort = 'newest',
    page = 1,
    limit = 12,
  } = req.query;

  const query = {};
  if (search) query.$text = { $search: search };
  if (category) query.category = category;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const sortMap = {
    newest: { createdAt: -1 },
    priceLowToHigh: { price: 1 },
    priceHighToLow: { price: -1 },
    rating: { ratings: -1 },
  };

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.max(1, Number(limit));

  const [products, total] = await Promise.all([
    Product.find(query)
      .sort(sortMap[sort] || sortMap.newest)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Product.countDocuments(query),
  ]);

  res.json({
    success: true,
    data: products,
    pagination: {
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum) || 1,
      limit: limitNum,
    },
  });
});

// @desc  Get a single product + related products
// @route GET /products/:id
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

  const related = await Product.find({ category: product.category, _id: { $ne: product._id } }).limit(6);

  res.json({ success: true, data: { product, related } });
});

// @desc  Create product (admin)
// @route POST /products
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, message: 'Product created', data: product });
});

// @desc  Update product (admin)
// @route PUT /products/:id
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, message: 'Product updated', data: product });
});

// @desc  Delete product (admin)
// @route DELETE /products/:id
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, message: 'Product deleted' });
});

// @desc  Add a review to a product
// @route POST /products/:id/reviews
const addReview = asyncHandler(async (req, res) => {
  const { userName, rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

  product.reviews.push({ userName, rating, comment });
  product.numReviews = product.reviews.length;
  product.ratings = +(product.reviews.reduce((a, r) => a + r.rating, 0) / product.reviews.length).toFixed(1);
  await product.save();

  res.status(201).json({ success: true, message: 'Review added', data: product });
});

// @desc  List categories
// @route GET /categories
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.json({ success: true, data: categories });
});

// @desc  Create category (admin)
// @route POST /categories
const createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json({ success: true, message: 'Category created', data: category });
});

// @desc  Update category (admin)
// @route PUT /categories/:id
const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
  res.json({ success: true, message: 'Category updated', data: category });
});

// @desc  Delete category (admin)
// @route DELETE /categories/:id
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
  res.json({ success: true, message: 'Category deleted' });
});

module.exports = {
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
};
