const express = require('express');
const api = express.Router();

const userController = require('../controllers/userController');

api.post('/register', userController.register);
api.post('/login', userController.login);

module.exports = api;