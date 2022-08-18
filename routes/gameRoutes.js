const express = require('express');
const api = express.Router();

const gameController = require('../controllers/gameController');

api.get('/games', gameController.getGames);
api.get('/games/:id', gameController.getGame);
api.post('/games', gameController.postGame);
api.put('/games/:id', gameController.putGame);
api.delete('/games/:id', gameController.deleteGame);

module.exports = api;