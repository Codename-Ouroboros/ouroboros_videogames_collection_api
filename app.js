const express = require("express");
const app = express();
// Import routes:
const companyRoutes = require('./routes/companyRoutes');
const genreRoutes = require('./routes/genreRoutes');
const roleRoutes = require('./routes/roleRoutes');
const statusRoutes = require('./routes/statusRoutes');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Route list:
app.use('/api', companyRoutes);
app.use('/api', genreRoutes);
app.use('/api', roleRoutes);
app.use('/api', statusRoutes);

module.exports = app;