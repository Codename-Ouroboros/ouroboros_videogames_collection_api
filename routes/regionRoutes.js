const express = require('express');
const api = express.Router();

const regionController = require('../controllers/regionController');

api.get('/regions', regionController.getRegions);
api.get('/regions/:id', regionController.getRegion);
api.post('/regions', regionController.postRegion);
api.put('/regions/:id', regionController.putRegion);
api.delete('/regions/:id', regionController.deleteRegion);

module.exports = api;