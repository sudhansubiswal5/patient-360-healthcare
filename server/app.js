const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// Global error handler (must be last)
app.use(errorHandler);

module.exports = app;
