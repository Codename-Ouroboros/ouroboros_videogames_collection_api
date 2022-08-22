const express = require('express');
const api = express.Router();

const genreController = require('../controllers/genreController');
const authMiddleware = require('../middlewares/authMiddleware');

api.get('/genres', [authMiddleware.ensureAuth], genreController.getGenres);
api.get('/genres/:id', [authMiddleware.ensureAuth], genreController.getGenre);
api.post('/genres', [authMiddleware.ensureAuth], genreController.postGenre);
api.put('/genres/:id', [authMiddleware.ensureAuth], genreController.putGenre);
api.delete('/genres/:id', [authMiddleware.ensureAuth], genreController.deleteGenre);

module.exports = api;