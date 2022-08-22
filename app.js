const express = require("express");
const app = express();
// Import routes:
const companyRoutes = require('./routes/companyRoutes');
const genreRoutes = require('./routes/genreRoutes');
const roleRoutes = require('./routes/roleRoutes');
const statusRoutes = require('./routes/statusRoutes');
const systemTypeRoutes = require('./routes/systemTypeRoutes');
const regionRoutes = require('./routes/regionRoutes');
const systemRoutes = require('./routes/systemRoutes');
const gameRoutes = require('./routes/gameRoutes');
const peripheralRoutes = require('./routes/peripheralRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Route list:
app.use('/api', companyRoutes);
app.use('/api', genreRoutes);
app.use('/api', roleRoutes);
app.use('/api', statusRoutes);
app.use('/api', systemTypeRoutes);
app.use('/api', regionRoutes);
app.use('/api', systemRoutes);
app.use('/api', gameRoutes);
app.use('/api', peripheralRoutes);
app.use('/api', userRoutes);
app.use('*', (req, res) => {res.status(404).send({msg: "The requested route does not exist"})});

module.exports = app;