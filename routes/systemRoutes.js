const express = require('express');
const api = express.Router();

const systemController = require('../controllers/systemController');

api.get('/systems', systemController.getSystems);
api.get('/systems/:id', systemController.getSystem);
api.post('/systems', systemController.postSystem);
api.put('/systems/:id', systemController.putSystem);
api.delete('/systems/:id', systemController.deleteSystem);

module.exports = api;