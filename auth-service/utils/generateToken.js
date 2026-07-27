const jwt = require('jsonwebtoken');
const config = require('../../credentials/config');

const generateToken = (payload) =>
  jwt.sign(payload, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN });

module.exports = generateToken;
