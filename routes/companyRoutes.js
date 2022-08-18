const express = require('express');
const api = express.Router();

const companyController = require('../controllers/companyController');

api.get('/companies', companyController.getCompanies);
api.get('/companies/:id', companyController.getCompany);
api.post('/companies', companyController.postCompany);
api.put('/companies/:id', companyController.putCompany);
api.delete('/companies/:id', companyController.deleteCompany);

module.exports = api;