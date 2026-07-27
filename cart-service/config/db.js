const mongoose = require('mongoose');
const config = require('../../credentials/config');

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URL, { serverSelectionTimeoutMS: 8000 });
    console.log(`[cart-service] MongoDB connected -> ${config.MONGODB_URL}`);
  } catch (err) {
    console.error(`[cart-service] MongoDB connection failed: ${err.message}`);
    setTimeout(connectDB, 5000);
  }
};
module.exports = connectDB;
