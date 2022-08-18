const express = require("express");
const app = express();
// Import routes:
const companyRoutes = require('./routes/companyRoutes');
const genreRoutes = require('./routes/genreRoutes');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Route list:
app.use('/api', companyRoutes);
app.use('/api', genreRoutes);

module.exports = app;