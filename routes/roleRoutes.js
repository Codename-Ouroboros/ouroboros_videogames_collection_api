const express = require('express');
const api = express.Router();

const roleController = require('../controllers/roleController');

api.get('/roles', roleController.getRoles);
api.get('/roles/:id', roleController.getRole);
api.post('/roles', roleController.postRole);
api.put('/roles/:id', roleController.putRole);
api.delete('/roles/:id', roleController.deleteRole);

module.exports = api;