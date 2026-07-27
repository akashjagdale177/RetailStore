const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1, min: 1 },
});

const cartSchema = new mongoose.Schema(
  {
    user: { type: String, required: true, unique: true, index: true },
    items: { type: [cartItemSchema], default: [] },
  },
  { timestamps: true }
);

cartSchema.virtual('total').get(function () {
  return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
});
cartSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.models.Cart || mongoose.model('Cart', cartSchema);
