const mongoose = require('mongoose');
const config = require('../../credentials/config');

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URL, { serverSelectionTimeoutMS: 8000 });
    console.log(`[auth-service] MongoDB connected -> ${config.MONGODB_URL}`);
  } catch (err) {
    console.error(`[auth-service] MongoDB connection failed: ${err.message}`);
    console.log('[auth-service] Retrying in 5s...');
    setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB;
