const express = require('express');
const api = express.Router();

const peripheralController = require('../controllers/peripheralController');

api.get('/peripherals', peripheralController.getPeripherals);
api.get('/peripherals/:id', peripheralController.getPeripheral);
api.post('/peripherals', peripheralController.postPeripheral);
api.put('/peripherals/:id', peripheralController.putPeripheral);
api.delete('/peripherals/:id', peripheralController.deletePeripheral);

module.exports = api;