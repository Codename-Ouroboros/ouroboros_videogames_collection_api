const express = require('express');
const api = express.Router();

const companiesController = require('../controllers/companiesController');

api.get('/companies', companiesController.getCompanies);
api.get('/companies/:id', companiesController.getCompany);
api.post('/companies', companiesController.postCompany);
api.put('/companies/:id', companiesController.putCompany);
api.delete('/companies/:id', companiesController.deleteCompany);

module.exports = api;