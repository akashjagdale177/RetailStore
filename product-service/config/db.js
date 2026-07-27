const mongoose = require('mongoose');
const config = require('../../credentials/config');
const seedDatabase = require('../utils/seed');

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URL, { serverSelectionTimeoutMS: 8000 });
    console.log(`[product-service] MongoDB connected -> ${config.MONGODB_URL}`);
    await seedDatabase();
  } catch (err) {
    console.error(`[product-service] MongoDB connection failed: ${err.message}`);
    console.log('[product-service] Retrying in 5s...');
    setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB;
