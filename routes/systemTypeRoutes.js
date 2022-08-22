const express = require('express');
const api = express.Router();

const systemTypeController = require('../controllers/systemTypeController');
const authMiddleware = require('../middlewares/authMiddleware');

api.get('/system_types', [authMiddleware.ensureAuth], systemTypeController.getSystemTypes);
api.get('/system_types/:id', [authMiddleware.ensureAuth], systemTypeController.getSystemType);
api.post('/system_types', [authMiddleware.ensureAuth], systemTypeController.postSystemType);
api.put('/system_types/:id', [authMiddleware.ensureAuth], systemTypeController.putSystemType);
api.delete('/system_types/:id', [authMiddleware.ensureAuth], systemTypeController.deleteSystemType);

module.exports = api;