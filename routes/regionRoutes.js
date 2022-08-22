const express = require('express');
const api = express.Router();

const regionController = require('../controllers/regionController');
const authMiddleware = require('../middlewares/authMiddleware');

api.get('/regions', [authMiddleware.ensureAuth], regionController.getRegions);
api.get('/regions/:id', [authMiddleware.ensureAuth], regionController.getRegion);
api.post('/regions', [authMiddleware.ensureAuth], regionController.postRegion);
api.put('/regions/:id', [authMiddleware.ensureAuth], regionController.putRegion);
api.delete('/regions/:id', [authMiddleware.ensureAuth], regionController.deleteRegion);

module.exports = api;