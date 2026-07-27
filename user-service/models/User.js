const mongoose = require('mongoose');

// Owns the EXTENDED profile (addresses, wishlist). Base identity (email/password)
// lives in auth-service's users collection, keyed by the same _id string.
// Duplicated base fields intentionally - see shared/README.md.
const addressSchema = new mongoose.Schema({
  label: { type: String, default: 'Home' },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  line1: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
});

const userSchema = new mongoose.Schema(
  {
    authId: { type: String, required: true, unique: true, index: true }, // matches auth-service User._id
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String },
    addresses: { type: [addressSchema], default: [] },
    wishlist: { type: [String], default: [] }, // productId list
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
