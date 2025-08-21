// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const scanRoutes = require('./routes/scans');

const app = express();

// Enable CORS (restrict to frontend origin in production)
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '2mb' }));

// Connect to MongoDB
mongoose.connect(process.env.DB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Mount routes
app.use('/api', authRoutes);
app.use('/api', apiRoutes);
app.use('/api', scanRoutes);

app.get('/health', (_, res) => res.send('OK'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
