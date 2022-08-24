const multiparty = require('connect-multiparty');
const express = require('express');
const api = express.Router();

const systemController = require('../controllers/systemController');
const authMiddleware = require('../middlewares/authMiddleware');
const multipartyMiddleware = multiparty({uploadDir: './uploads/images/systems'});

api.get('/systems', [authMiddleware.ensureAuth], systemController.getSystems);
api.get('/systems/:id', [authMiddleware.ensureAuth], systemController.getSystem);
api.post('/systems', [authMiddleware.ensureAuth, multipartyMiddleware], systemController.postSystem);
api.put('/systems/:id', [authMiddleware.ensureAuth, multipartyMiddleware], systemController.putSystem);
api.delete('/systems/:id', [authMiddleware.ensureAuth], systemController.deleteSystem);
api.get('/systems/images/:imageName', [authMiddleware.ensureAuth], systemController.getSystemImage);

module.exports = api;