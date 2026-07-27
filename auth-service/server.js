require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const { errorHandler, notFound } = require('./middlewares/errorHandler');
const config = require('../credentials/config');

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => res.json({ success: true, service: 'auth-service', status: 'healthy' }));

app.use('/', authRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[auth-service] running on port ${PORT}`);
  console.log(`[auth-service] gateway configured at ${config.GATEWAY_URL}`);
});
