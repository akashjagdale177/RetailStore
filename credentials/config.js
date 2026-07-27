/**
 * credentials/config.js
 * ----------------------------------------------------------------------------
 * Central backend configuration.
 *
 * Every microservice does:
 *      const config = require('../../credentials/config');
 *
 * and gets every URL in the system, plus secrets pulled from environment
 * variables (never hardcoded). This is the ONLY file that needs to change
 * when you move from localhost -> a real IP / domain (edit urls.json).
 * ----------------------------------------------------------------------------
 */

const urls = require('./urls.json');

const config = {
  // Public service URLs (single source of truth, see urls.json)
  FRONTEND_URL: process.env.FRONTEND_URL || urls.FRONTEND_URL,
  GATEWAY_URL: process.env.GATEWAY_URL || urls.GATEWAY_URL,

  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL || urls.AUTH_SERVICE_URL,
  PRODUCT_SERVICE_URL: process.env.PRODUCT_SERVICE_URL || urls.PRODUCT_SERVICE_URL,
  CART_SERVICE_URL: process.env.CART_SERVICE_URL || urls.CART_SERVICE_URL,
  ORDER_SERVICE_URL: process.env.ORDER_SERVICE_URL || urls.ORDER_SERVICE_URL,
  USER_SERVICE_URL: process.env.USER_SERVICE_URL || urls.USER_SERVICE_URL,
  NOTIFICATION_SERVICE_URL: process.env.NOTIFICATION_SERVICE_URL || urls.NOTIFICATION_SERVICE_URL,

  // Database - defaults to the replica-set URL. Set USE_LOCAL_MONGO=true
  // while developing on a laptop without a 3-node replica set running.
  MONGODB_URL:
    process.env.MONGODB_URL ||
    (process.env.USE_LOCAL_MONGO === 'true' ? urls.MONGODB_URL_LOCAL : urls.MONGODB_URL),

  // Secrets - MUST come from environment / Kubernetes Secrets in real deployments.
  JWT_SECRET: process.env.JWT_SECRET || 'dev-only-secret-change-me',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',

  // Hardcoded admin login as requested (used by auth-service only)
  ADMIN_USERNAME: process.env.ADMIN_USERNAME || 'akash',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || '123',
};

module.exports = config;
