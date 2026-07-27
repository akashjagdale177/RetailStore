const config = require('../../credentials/config');

/**
 * Maps a public path prefix on the gateway to the internal microservice URL.
 * Frontend only ever talks to the gateway -> gateway fans out to services.
 * Because targets come from credentials/config.js, repointing the whole
 * system to a new IP/domain only requires editing credentials/urls.json.
 */
module.exports = [
  { path: '/api/auth', target: config.AUTH_SERVICE_URL, rewrite: { '^/api/auth': '' } },
  { path: '/api/products', target: config.PRODUCT_SERVICE_URL, rewrite: { '^/api': '' } },
  { path: '/api/categories', target: config.PRODUCT_SERVICE_URL, rewrite: { '^/api': '' } },
  { path: '/api/cart', target: config.CART_SERVICE_URL, rewrite: { '^/api': '' } },
  { path: '/api/orders', target: config.ORDER_SERVICE_URL, rewrite: { '^/api': '' } },
  { path: '/api/users', target: config.USER_SERVICE_URL, rewrite: { '^/api': '' } },
  { path: '/api/notifications', target: config.NOTIFICATION_SERVICE_URL, rewrite: { '^/api': '' } },
];
