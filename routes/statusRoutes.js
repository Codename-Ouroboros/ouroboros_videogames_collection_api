const express = require('express');
const api = express.Router();

const statusController = require('../controllers/statusController');
const authMiddleware = require('../middlewares/authMiddleware');

api.get('/status', [authMiddleware.ensureAuth], statusController.getStatusList);
api.get('/status/:id', [authMiddleware.ensureAuth], statusController.getStatus);
api.post('/status', [authMiddleware.ensureAuth], statusController.postStatus);
api.put('/status/:id', [authMiddleware.ensureAuth], statusController.putStatus);
api.delete('/status/:id', [authMiddleware.ensureAuth], statusController.deleteStatus);

module.exports = api;