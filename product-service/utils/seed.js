const Product = require('../models/Product');
const Category = require('../models/Category');
const { categories, buildProducts } = require('./seedData');

/**
 * Seeds the database with realistic categories + 100+ products on first run.
 * Safe to call every startup — it only inserts if the collections are empty,
 * so restarts / redeploys never create duplicates.
 */
async function seedDatabase() {
  try {
    const productCount = await Product.countDocuments();
    const categoryCount = await Category.countDocuments();

    if (categoryCount === 0) {
      await Category.insertMany(categories);
      console.log(`[product-service] Seeded ${categories.length} categories`);
    } else {
      console.log('[product-service] Categories already exist, skipping seed');
    }

    if (productCount === 0) {
      const products = buildProducts();
      await Product.insertMany(products);
      console.log(`[product-service] Seeded ${products.length} products`);
    } else {
      console.log(`[product-service] ${productCount} products already exist, skipping seed`);
    }
  } catch (err) {
    console.error(`[product-service] Seeding failed: ${err.message}`);
  }
}

module.exports = seedDatabase;

// Allow running directly: `npm run seed`
if (require.main === module) {
  const mongoose = require('mongoose');
  const config = require('../../credentials/config');
  mongoose
    .connect(config.MONGODB_URL)
    .then(async () => {
      console.log('[product-service] Connected for manual seeding...');
      await seedDatabase();
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
