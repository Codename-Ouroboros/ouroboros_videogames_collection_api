const path = require('path');
const fs = require('fs');
const System = require('../models/systemModel');
const authMiddleware = require('../middlewares/authMiddleware');

async function getSystems(req, res){
    // returns a list of Systems

    const user = await authMiddleware.getUser(req, res);
    
    try{
        const systems = await System.find({user_id: user.id}).sort({model: 1});

        if(systems.length === 0){
            res.status(400).send({msg: "there are no systems"});
        }else{
            res.status(200).send(systems);
        }
    }catch(error){
        res.status(500).send(error);
    }
}

async function getSystem(req, res){
    // returns a system

    const systemId = req.params.id;
    const user = await authMiddleware.getUser(req, res);

    try{
        const system = await System.findById(systemId);

        if(!system){
            res.status(400).send({msg: "the system does not exist"});
        }else if(system.user_id != user.id){
            res.status(403).send({msg: "Forbidden - Access to this resource on the server is denied!"});
        }else{
            res.status(200).send(system);
        }
    }catch(error){
        res.status(500).send(error);
    }
 
}

async function postSystem(req, res){
    // create a new system

    const user = await authMiddleware.getUser(req, res);

    const system = new System();
    const params = req.body;

    // body data:
    system.model = params.model;
    system.brand = params.brand;
    system.status = params.status;
    system.type_system = params.type_system;
    system.ean = params.ean;
    system.serial = params.serial;
    system.user_id = user.id; 

    if(req.files.logo){
        const filePath = req.files.logo.path;
        let fileSplit = path.resolve(filePath).split(path.sep);

        let filename = fileSplit[fileSplit.length-1];

        let fileExt = filename.split(".");
        if(fileExt[fileExt.length-1] !== "jpg" && fileExt[fileExt.length-1] !== "jpeg" && fileExt[fileExt.length-1] !== "png"){
            // res.status(400).send({msg: "Incorrect extension. Only use .jpg, .jpeg or .png"});
            console.log('incorrect extension');
        }else{
            system.logo = filename;
        }
    }

    if(req.files.photo){
        const filePath = req.files.photo.path;
        let fileSplit = path.resolve(filePath).split(path.sep);

        let filename = fileSplit[fileSplit.length-1];

        let fileExt = filename.split(".");
        if(fileExt[fileExt.length-1] !== "jpg" && fileExt[fileExt.length-1] !== "jpeg" && fileExt[fileExt.length-1] !== "png"){
            // res.status(400).send({msg: "Incorrect extension. Only use .jpg, .jpeg or .png"});
            console.log('incorrect extension');
        }else{
            system.photo = filename;
        }
    }

    if(req.files.images){
        let filenames = [];
        for(let i in req.files.images){
            const filePath = req.files.images[i].path;
            let fileSplit = path.resolve(filePath).split(path.sep);
    
            let filename = fileSplit[fileSplit.length-1];
    
            let fileExt = filename.split(".");
            if(fileExt[fileExt.length-1] !== "jpg" && fileExt[fileExt.length-1] !== "jpeg" && fileExt[fileExt.length-1] !== "png"){
                // res.status(400).send({msg: "Incorrect extension. Only use .jpg, .jpeg or .png"});
                console.log('incorrect extension');
            }else{
                filenames.push(filename);
            }
        }
        system.images = filenames;
    }

    try{
        const systemStore = await system.save();

        if(!systemStore){
            res.status(400).send({msg: "error when saving the system"});
        }else{
            res.status(201).send({system: systemStore});
        }
    }catch(error){
        res.status(500).send(error);
    }
}

async function putSystem(req, res){
    // Update a system

    const systemId = req.params.id;
    const params = req.body;
    const user = await authMiddleware.getUser(req, res);

    try{
        System.findById({_id: systemId}, (err, systemData) =>{
            if(err){
                res.status(500).send({msg: err});
            }else{
                let system = systemData;

                if(!system){
                    res.status(400).send({msg: "the system does not exist"});
                }else if(system.user_id != user.id){
                    res.status(403).send({msg: "Forbidden - Access to this resource on the server is denied!"});
                }else{
                    // body data:
                    system.model = params.model;
                    system.brand = params.brand;
                    system.status = params.status;
                    system.text_logo = params.text_logo;
                    system.type_system = params.type_system;
                    system.ean = params.ean;
                    system.serial = params.serial;
        
                    if(req.files.logo){
                        const filePath = req.files.logo.path;
                        let fileSplit = path.resolve(filePath).split(path.sep);
        
                        let filename = fileSplit[fileSplit.length-1];
        
                        let fileExt = filename.split(".");
                        if(fileExt[fileExt.length-1] !== "jpg" && fileExt[fileExt.length-1] !== "jpeg" && fileExt[fileExt.length-1] !== "png"){
                            // res.status(400).send({msg: "Incorrect extension. Only use .jpg, .jpeg or .png"});
                            console.log('incorrect extension');
                        }else{
                            system.logo = filename;
                        }
                    }
        
                    if(req.files.photo){
                        const filePath = req.files.photo.path;
                        let fileSplit = path.resolve(filePath).split(path.sep);
        
                        let filename = fileSplit[fileSplit.length-1];
        
                        let fileExt = filename.split(".");
                        if(fileExt[fileExt.length-1] !== "jpg" && fileExt[fileExt.length-1] !== "jpeg" && fileExt[fileExt.length-1] !== "png"){
                            // res.status(400).send({msg: "Incorrect extension. Only use .jpg, .jpeg or .png"});
                            console.log('incorrect extension');
                        }else{
                            system.photo = filename;
                        }
                    }
        
                    if(req.files.images){
                        let filenames = [];
                        for(let i in req.files.images){
                            const filePath = req.files.images[i].path;
                            let fileSplit = path.resolve(filePath).split(path.sep);
                    
                            let filename = fileSplit[fileSplit.length-1];
                    
                            let fileExt = filename.split(".");
                            if(fileExt[fileExt.length-1] !== "jpg" && fileExt[fileExt.length-1] !== "jpeg" && fileExt[fileExt.length-1] !== "png"){
                                // res.status(400).send({msg: "Incorrect extension. Only use .jpg, .jpeg or .png"});
                                console.log('incorrect extension');
                            }else{
                                filenames.push(filename);
                            }
                        }
                        system.images = filenames;
                    }
                    System.findByIdAndUpdate({_id: systemId}, system, (err, systemResult)=>{
                        if(err){
                            res.status(500).send({msg: err});
                        }else{
                            res.status(201).send({msg: "the system has been update"});
                        }
                    });
                }
            }
        });

    }catch(error){
        res.status(500).send(error);
    }
}

async function deleteSystem(req, res){
    // delete a system

    const systemId = req.params.id;
    const user = await authMiddleware.getUser(req, res);

    try{
        System.findById({_id: systemId}, (err, systemData) =>{
            if(err){
                res.status(500).send({msg: err});
            }else{
                let system = systemData;

                if(!system){
                    res.status(400).send({msg: "the system does not exist"});
                }else if(system.user_id != user.id){
                    res.status(403).send({msg: "Forbidden - Access to this resource on the server is denied!"});
                }else{
                    System.findByIdAndDelete({_id: systemId}, (err, systemResult) =>{
                        if(err){
                            res.status(500).send({msg: err});
                        }else{
                            res.status(200).send({msg: "the system has been delete"});
                        }
                    });
                }
            }
        });

    }catch(error){
        res.status(500).send(error);
    }
}

function getSystemImage(req, res){
    // show the avatar's image:

    const imageName = req.params.imageName;
    const filePath = `./uploads/images/systems/${imageName}`;

    fs.stat(filePath, (err, stat)=>{
        if(err){
            res.status(404).send({msg: "System image doesn't exists"});
        }else{
            res.sendFile(path.resolve(filePath));
        }
    });
}

module.exports = {
    getSystems,
    getSystem,
    postSystem,
    putSystem,
    deleteSystem,
    getSystemImage
}