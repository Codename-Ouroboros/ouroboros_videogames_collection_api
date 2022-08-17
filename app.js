const express = require("express");
const app = express();

// Import routes:
const companiesRoutes = require('./routes/companiesRoutes.js');

// Route list:
app.use('/api', companiesRoutes);

module.exports = app;