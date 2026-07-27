require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const { errorHandler, notFound } = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 5002;

connectDB();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => res.json({ success: true, service: 'product-service', status: 'healthy' }));

app.use('/', productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`[product-service] running on port ${PORT}`));
