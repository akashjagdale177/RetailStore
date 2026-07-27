const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Product name is required'], trim: true },
    description: { type: String, required: [true, 'Description is required'] },
    price: { type: Number, required: [true, 'Price is required'], min: 0 },
    discountPercentage: { type: Number, default: 0, min: 0, max: 90 },
    images: { type: [String], default: [] },
    category: { type: String, required: true, index: true },
    brand: { type: String, required: true },
    stock: { type: Number, required: true, default: 0, min: 0 },
    ratings: { type: Number, default: 0, min: 0, max: 5 },
    numReviews: { type: Number, default: 0 },
    reviews: { type: [reviewSchema], default: [] },
  },
  { timestamps: true }
);

productSchema.virtual('finalPrice').get(function () {
  return Math.round(this.price * (1 - this.discountPercentage / 100));
});
productSchema.set('toJSON', { virtuals: true });

productSchema.index({ name: 'text', description: 'text', brand: 'text' });

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
