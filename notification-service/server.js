require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const notificationRoutes = require('./routes/notificationRoutes');
const { errorHandler, notFound } = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 5006;

connectDB();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/health', (req, res) => res.json({ success: true, service: 'notification-service', status: 'healthy' }));
app.use('/notifications', notificationRoutes);

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => console.log(`[notification-service] running on port ${PORT}`));
