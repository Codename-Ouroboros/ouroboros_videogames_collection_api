const multiparty = require('connect-multiparty');
const express = require('express');
const api = express.Router();

const peripheralController = require('../controllers/peripheralController');
const authMiddleware = require('../middlewares/authMiddleware');
const multipartyMiddleware = multiparty({uploadDir: './uploads/images/peripherals'});


api.get('/peripherals', [authMiddleware.ensureAuth], peripheralController.getPeripherals);
api.get('/peripherals/:id', [authMiddleware.ensureAuth], peripheralController.getPeripheral);
api.post('/peripherals', [authMiddleware.ensureAuth, multipartyMiddleware], peripheralController.postPeripheral);
api.put('/peripherals/:id', [authMiddleware.ensureAuth, multipartyMiddleware], peripheralController.putPeripheral);
api.delete('/peripherals/:id', [authMiddleware.ensureAuth], peripheralController.deletePeripheral);
api.get('/peripherals/images/:imageName', [authMiddleware.ensureAuth], peripheralController.getPeripheralImage);

module.exports = api;