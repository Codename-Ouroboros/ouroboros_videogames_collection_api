const path = require('path');
const fs = require('fs');
const Company = require('../models/companyModel');
const authMiddleware = require('../middlewares/authMiddleware');

async function getCompanies(req, res){
    // returns a list of companies that distribute, manufacture and develop video games

    const user = await authMiddleware.getUser(req, res);
    
    try{
        const companies = await Company.find({user_id: user.id}).sort({name: 1});

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
    const user = await authMiddleware.getUser(req, res);

    try{
        const company = await Company.findById(companyId);

        if(!company){
            res.status(400).send({msg: "the company does not exist"});
        }else if(company.user_id != user.id){
            res.status(403).send({msg: "Forbidden - Access to this resource on the server is denied!"});
        }else{
            res.status(200).send(company);
        }
    }catch(error){
        res.status(500).send(error);
    }
 
}

async function postCompany(req, res){
    // create a new company

    const user = await authMiddleware.getUser(req, res);

    const company = new Company();
    const body = req.body;

    // body data:
    company.name = body.name;
    company.user_id = user.id;

    if(req.files.logo){
        const filePath = req.files.logo.path;
        let fileSplit = path.resolve(filePath).split(path.sep);

        let filename = fileSplit[fileSplit.length-1];

        let fileExt = filename.split(".");
        if(fileExt[fileExt.length-1] !== "jpg" && fileExt[fileExt.length-1] !== "jpeg" && fileExt[fileExt.length-1] !== "png"){
            // res.status(400).send({msg: "Incorrect extension. Only use .jpg, .jpeg or .png"});
            console.log('incorrect extension');
        }else{
            company.logo = filename;
        }
    }

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
    const user = await authMiddleware.getUser(req, res);

    try{
        Company.findById({ _id: companyId}, (err, companyData) => {
            let company = companyData;

            if(err){
                res.status(500).send({msg: "Server status error"});
            }else{
                if(!companyData){
                    res.status(404).send({msg: "the company does not exist"});
                }else if(company.user_id != user.id){
                    res.status(403).send({msg: "Forbidden - Access to this resource on the server is denied!"});
                }else{
                    let company = companyData;

                    company.name = params.name;

                    if(req.files.logo){
                        const filePath = req.files.logo.path;
                        let fileSplit = path.resolve(filePath).split(path.sep);
                
                        let filename = fileSplit[fileSplit.length-1];
                
                        let fileExt = filename.split(".");
                        if(fileExt[fileExt.length-1] !== "jpg" && fileExt[fileExt.length-1] !== "jpeg" && fileExt[fileExt.length-1] !== "png"){
                            // res.status(400).send({msg: "Incorrect extension. Only use .jpg, .jpeg or .png"});
                            console.log('incorrect extension');
                        }else{
                            company.logo = filename;
                        }
                    }

                    Company.findByIdAndUpdate({_id: companyId}, company, (err, companyResult) => {
                        if(err){
                            res.status(404).send({msg: err});
                        }else{
                            res.status(201).send({msg: "the company has been update"});
                        }
                    });
                }
            }
        });
        
    }catch(error){
        res.status(500).send(error);
    }
}

async function deleteCompany(req, res){
    // delete a company

    const companyId = req.params.id;
    const user = await authMiddleware.getUser(req, res);

    try{
        
        let company = await Company.findById(companyId);

        if(!company){
            res.status(400).send({msg: "the company does not exist"});
        }else if(company.user_id != user.id){
            res.status(403).send({msg: "Forbidden - Access to this resource on the server is denied!"});
        }else{
            company = await Company.findByIdAndDelete(companyId);
            res.status(200).send({msg: "the company has been delete"});
        }

    }catch(error){
        res.status(500).send(error);
    }
}

function getLogo(req, res){
    // show the avatar's image:

    const logoName = req.params.logoName;
    const filePath = `./uploads/images/companies/logo/${logoName}`;

    fs.stat(filePath, (err, stat)=>{
        if(err){
            res.status(404).send({msg: "Logo doesn't exists"});
        }else{
            res.sendFile(path.resolve(filePath));
        }
    });
}

module.exports = {
    getCompanies,
    getCompany,
    postCompany,
    putCompany,
    deleteCompany,
    getLogo
}