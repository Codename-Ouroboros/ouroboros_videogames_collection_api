const express = require('express');
const api = express.Router();

const companyController = require('../controllers/companyController');
const authMiddleware = require('../middlewares/authMiddleware');

api.get('/companies', [authMiddleware.ensureAuth], companyController.getCompanies);
api.get('/companies/:id', [authMiddleware.ensureAuth], companyController.getCompany);
api.post('/companies', [authMiddleware.ensureAuth], companyController.postCompany);
api.put('/companies/:id', [authMiddleware.ensureAuth], companyController.putCompany);
api.delete('/companies/:id', [authMiddleware.ensureAuth], companyController.deleteCompany);

module.exports = api;