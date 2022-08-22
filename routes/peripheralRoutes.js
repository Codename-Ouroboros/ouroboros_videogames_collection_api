const express = require('express');
const api = express.Router();

const peripheralController = require('../controllers/peripheralController');
const authMiddleware = require('../middlewares/authMiddleware');

api.get('/peripherals', [authMiddleware.ensureAuth], peripheralController.getPeripherals);
api.get('/peripherals/:id', [authMiddleware.ensureAuth], peripheralController.getPeripheral);
api.post('/peripherals', [authMiddleware.ensureAuth], peripheralController.postPeripheral);
api.put('/peripherals/:id', [authMiddleware.ensureAuth], peripheralController.putPeripheral);
api.delete('/peripherals/:id', [authMiddleware.ensureAuth], peripheralController.deletePeripheral);

module.exports = api;