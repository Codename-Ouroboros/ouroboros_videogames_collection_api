const express = require('express');
const api = express.Router();

const genreController = require('../controllers/genreController');

api.get('/genres', genreController.getGenres);
api.get('/genres/:id', genreController.getGenre);
api.post('/genres', genreController.postGenre);
api.put('/genres/:id', genreController.putGenre);
api.delete('/genres/:id', genreController.deleteGenre);

module.exports = api;