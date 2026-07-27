const mongoose = require('mongoose');
const config = require('../../credentials/config');
const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URL, { serverSelectionTimeoutMS: 8000 });
    console.log(`[user-service] MongoDB connected -> ${config.MONGODB_URL}`);
  } catch (err) {
    console.error(`[user-service] MongoDB connection failed: ${err.message}`);
    setTimeout(connectDB, 5000);
  }
};
module.exports = connectDB;
