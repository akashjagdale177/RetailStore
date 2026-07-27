const bcrypt = require('bcryptjs');
const User = require('../models/User');
const asyncHandler = require('../middlewares/asyncHandler');
const generateToken = require('../utils/generateToken');
const config = require('../../credentials/config');

// @desc   Register a new customer
// @route  POST /register
const register = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email and password are required' });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ success: false, message: 'Email already registered' });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, phone, password: hashed });

  const token = generateToken({ id: user._id, role: user.role, name: user.name, email: user.email });

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    data: {
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    },
  });
});

// @desc   Login (also handles the hardcoded admin login: akash / 123)
// @route  POST /login
const login = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  // --- Hardcoded admin shortcut, as required by the assignment ---
  const loginId = username || email;
  if (loginId === config.ADMIN_USERNAME && password === config.ADMIN_PASSWORD) {
    const token = generateToken({
      id: 'admin-hardcoded',
      role: 'admin',
      name: 'Akash (Admin)',
      email: 'admin@retailstore.local',
    });
    return res.json({
      success: true,
      message: 'Admin login successful',
      data: {
        token,
        user: { id: 'admin-hardcoded', name: 'Akash (Admin)', email: 'admin@retailstore.local', role: 'admin' },
      },
    });
  }

  if (!loginId || !password) {
    return res.status(400).json({ success: false, message: 'Email/username and password are required' });
  }

  const user = await User.findOne({ email: loginId }).select('+password');
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
  if (user.isBlocked) {
    return res.status(403).json({ success: false, message: 'This account has been blocked by admin' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const token = generateToken({ id: user._id, role: user.role, name: user.name, email: user.email });

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    },
  });
});

// @desc   Get currently logged in user (validates token)
// @route  GET /me
const me = asyncHandler(async (req, res) => {
  if (req.user.id === 'admin-hardcoded') {
    return res.json({ success: true, data: req.user });
  }
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  res.json({ success: true, data: user });
});

// @desc   Logout - stateless JWT, client just discards the token.
// @route  POST /logout
const logout = asyncHandler(async (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

module.exports = { register, login, me, logout };
