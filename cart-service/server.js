require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const cartRoutes = require('./routes/cartRoutes');
const { errorHandler, notFound } = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 5003;

connectDB();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/health', (req, res) => res.json({ success: true, service: 'cart-service', status: 'healthy' }));
app.use('/cart', cartRoutes);

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => console.log(`[cart-service] running on port ${PORT}`));
