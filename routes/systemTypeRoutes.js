const express = require('express');
const api = express.Router();

const systemTypeController = require('../controllers/systemTypeController');

api.get('/system_types', systemTypeController.getSystemTypes);
api.get('/system_types/:id', systemTypeController.getSystemType);
api.post('/system_types', systemTypeController.postSystemType);
api.put('/system_types/:id', systemTypeController.putSystemType);
api.delete('/system_types/:id', systemTypeController.deleteSystemType);

module.exports = api;