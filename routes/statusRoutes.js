const express = require('express');
const api = express.Router();

const statusController = require('../controllers/statusController');

api.get('/status', statusController.getStatusList);
api.get('/status/:id', statusController.getStatus);
api.post('/status', statusController.postStatus);
api.put('/status/:id', statusController.putStatus);
api.delete('/status/:id', statusController.deleteStatus);

module.exports = api;