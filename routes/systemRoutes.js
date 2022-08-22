const express = require('express');
const api = express.Router();

const systemController = require('../controllers/systemController');
const authMiddleware = require('../middlewares/authMiddleware');

api.get('/systems', [authMiddleware.ensureAuth], systemController.getSystems);
api.get('/systems/:id', [authMiddleware.ensureAuth], systemController.getSystem);
api.post('/systems', [authMiddleware.ensureAuth], systemController.postSystem);
api.put('/systems/:id', [authMiddleware.ensureAuth], systemController.putSystem);
api.delete('/systems/:id', [authMiddleware.ensureAuth], systemController.deleteSystem);

module.exports = api;