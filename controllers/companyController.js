
const Company = require('../models/companyModel');

async function getCompanies(req, res){
    // returns a list of companies that distribute, manufacture and develop video games
    
    try{
        const companies = await Company.find().sort({name: 1});

        if(companies.length === 0){
            res.status(400).send({msg: "there are no companies"});
        }else{
            res.status(200).send(companies);
        }
    }catch(error){
        res.status(500).send(error);
    }
}

async function getCompany(req, res){
    // returns a company

    const companyId = req.params.id;

    try{
        const company = await Company.findById(companyId);

        if(!company){
            res.status(400).send({msg: "the company does not exist"});
        }else{
            res.status(200).send(company);
        }
    }catch(error){
        res.status(500).send(error);
    }
 
}

async function postCompany(req, res){
    // create a new company

    const company = new Company();
    const params = req.body;

    // body data:
    company.name = params.name;
    company.logo = params.logo;

    try{
        const companyStore = await company.save();

        if(!companyStore){
            res.status(400).send({msg: "error when saving the company"});
        }else{
            res.status(201).send({company: companyStore});
        }
    }catch(error){
        res.status(500).send(error);
    }
}

async function putCompany(req, res){
    // Update a company

    const companyId = req.params.id;
    const params = req.body;

    try{
        const company = await Company.findByIdAndUpdate(companyId, params);

        if(!company){
            res.status(400).send({msg: "the company does not exist"});
        }else{
            res.status(201).send({msg: "the company has been update"});
        }
    }catch(error){
        res.status(500).send(error);
    }
}

async function deleteCompany(req, res){
    // delete a company

    const companyId = req.params.id;

    try{
        const company = await Company.findByIdAndDelete(companyId);

        if(!company){
            res.status(400).send({msg: "the company does not exist"});
        }else{
            res.status(200).send({msg: "the company has been delete"});
        }
    }catch(error){
        res.status(500).send(error);
    }
}

module.exports = {
    getCompanies,
    getCompany,
    postCompany,
    putCompany,
    deleteCompany
}