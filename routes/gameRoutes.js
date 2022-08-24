const multiparty = require('connect-multiparty');
const express = require('express');
const api = express.Router();

const gameController = require('../controllers/gameController');
const authMiddleware = require('../middlewares/authMiddleware');
const multipartyMiddleware = multiparty({uploadDir: './uploads/images/games'});

api.get('/games', [authMiddleware.ensureAuth], gameController.getGames);
api.get('/games/:id', [authMiddleware.ensureAuth], gameController.getGame);
api.post('/games', [authMiddleware.ensureAuth, multipartyMiddleware], gameController.postGame);
api.put('/games/:id', [authMiddleware.ensureAuth, multipartyMiddleware], gameController.putGame);
api.delete('/games/:id', [authMiddleware.ensureAuth], gameController.deleteGame);

module.exports = api;