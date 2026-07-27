require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const { errorHandler, notFound } = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 5005;

connectDB();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/health', (req, res) => res.json({ success: true, service: 'user-service', status: 'healthy' }));
app.use('/users', userRoutes);

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => console.log(`[user-service] running on port ${PORT}`));
