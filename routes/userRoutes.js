const express = require('express');
const multiparty = require('connect-multiparty');
const api = express.Router();

const multipartyMiddleware = multiparty({uploadDir: './uploads/images/avatars'});
const authMiddleware = require('../middlewares/authMiddleware');

const userController = require('../controllers/userController');

api.post('/register', userController.register);
api.post('/login', userController.login);
api.put('/users/:id', [authMiddleware.ensureAuth, multipartyMiddleware], userController.updateUser);
api.get('/users/avatar/:avatarName', [authMiddleware.ensureAuth], userController.getAvatar);
api.delete('/users', [authMiddleware.ensureAuth], userController.deleteUser);

module.exports = api;