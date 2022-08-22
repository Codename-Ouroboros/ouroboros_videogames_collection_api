const express = require('express');
const api = express.Router();

const roleController = require('../controllers/roleController');
const authMiddleware = require('../middlewares/authMiddleware');

api.get('/roles', [authMiddleware.ensureAuth], roleController.getRoles);
api.get('/roles/:id', [authMiddleware.ensureAuth], roleController.getRole);
api.post('/roles', [authMiddleware.ensureAuth], roleController.postRole);
api.put('/roles/:id', [authMiddleware.ensureAuth], roleController.putRole);
api.delete('/roles/:id', [authMiddleware.ensureAuth], roleController.deleteRole);

module.exports = api;