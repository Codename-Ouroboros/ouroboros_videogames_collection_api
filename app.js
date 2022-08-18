const express = require("express");
const app = express();
// Import routes:
const companiesRoutes = require('./routes/companiesRoutes.js');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Route list:
app.use('/api', companiesRoutes);

module.exports = app;