const multiparty = require('connect-multiparty');
const express = require('express');
const api = express.Router();

const companyController = require('../controllers/companyController');
const authMiddleware = require('../middlewares/authMiddleware');
const multipartyMiddleware = multiparty({uploadDir: './uploads/images/companies/logo'});

api.get('/companies', [authMiddleware.ensureAuth], companyController.getCompanies);
api.get('/companies/:id', [authMiddleware.ensureAuth], companyController.getCompany);
api.post('/companies', [authMiddleware.ensureAuth, multipartyMiddleware], companyController.postCompany);
api.put('/companies/:id', [authMiddleware.ensureAuth, multipartyMiddleware], companyController.putCompany);
api.delete('/companies/:id', [authMiddleware.ensureAuth], companyController.deleteCompany);
api.get('/companies/logos/:logoName', [authMiddleware.ensureAuth], companyController.getLogo);

module.exports = api;