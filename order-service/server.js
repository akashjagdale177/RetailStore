require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const orderRoutes = require('./routes/orderRoutes');
const { errorHandler, notFound } = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 5004;

connectDB();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/health', (req, res) => res.json({ success: true, service: 'order-service', status: 'healthy' }));
app.use('/orders', orderRoutes);

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => console.log(`[order-service] running on port ${PORT}`));
