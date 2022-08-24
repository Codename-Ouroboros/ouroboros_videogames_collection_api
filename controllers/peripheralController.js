const path = require('path');
const fs = require('fs');
const Peripheral = require('../models/peripheralModel');
const authMiddleware = require('../middlewares/authMiddleware');

async function getPeripherals(req, res){
    // returns a list of peripherals

    const user = await authMiddleware.getUser(req, res);
    
    try{
        const peripherals = await Peripheral.find({user_id: user.id}).sort({name: 1});

        if(peripherals.length === 0){
            res.status(400).send({msg: "there are no peripherals"});
        }else{
            res.status(200).send(peripherals);
        }
    }catch(error){
        res.status(500).send(error);
    }
}

async function getPeripheral(req, res){
    // returns a peripheral

    const peripheralId = req.params.id;
    const user = await authMiddleware.getUser(req, res);

    try{
        const peripheral = await Peripheral.findById(peripheralId);

        if(!peripheral){
            res.status(400).send({msg: "the peripheral does not exist"});
        }else if(peripheral.user_id != user.id){
            res.status(403).send({msg: "Forbidden - Access to this resource on the server is denied!"});
        }else{
            res.status(200).send(peripheral);
        }
    }catch(error){
        res.status(500).send(error);
    }
 
}

async function postPeripheral(req, res){
    // create a new peripheral

    const user = await authMiddleware.getUser(req, res);

    const peripheral = new Peripheral();
    const params = req.body;

    // body data:
    peripheral.name = params.name;
    peripheral.brand = params.brand;
    peripheral.system = params.system;
    peripheral.status = params.status;
    peripheral.ean = params.ean;
    peripheral.serial = params.serial;
    peripheral.user_id = params.user_id;
    
    if(req.files.photo){
        const filePath = req.files.photo.path;
        let fileSplit = path.resolve(filePath).split(path.sep);

        let filename = fileSplit[fileSplit.length-1];

        let fileExt = filename.split(".");
        if(fileExt[fileExt.length-1] !== "jpg" && fileExt[fileExt.length-1] !== "jpeg" && fileExt[fileExt.length-1] !== "png"){
            // res.status(400).send({msg: "Incorrect extension. Only use .jpg, .jpeg or .png"});
            console.log('incorrect extension');
        }else{
            peripheral.photo = filename;
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
        peripheral.images = filenames;
    }

    try{
        const peripheralStore = await peripheral.save();

        if(!peripheralStore){
            res.status(400).send({msg: "error when saving the peripheral"});
        }else{
            res.status(201).send({peripheral: peripheralStore});
        }
    }catch(error){
        res.status(500).send(error);
    }
}

async function putPeripheral(req, res){
    // Update a peripheral

    const peripheralId = req.params.id;
    const params = req.body;
    const user = await authMiddleware.getUser(req, res);

    try{
        Peripheral.findById({_id: peripheralId}, (err, peripheralData) =>{
            if(err){
                res.status(500).send({msg: err});
            }else{
                let peripheral = peripheralData;

                if(!peripheral){
                    res.status(400).send({msg: "the peripheral does not exist"});
                }else if(peripheral.user_id != user.id){
                    res.status(403).send({msg: "Forbidden - Access to this resource on the server is denied!"});
                }else{
                    // body data:
                    peripheral.name = params.name;
                    peripheral.brand = params.brand;
                    peripheral.system = params.system;
                    peripheral.images = params.images;
                    peripheral.status = params.status;
                    peripheral.ean = params.ean;
                    peripheral.serial = params.serial;
                    
                    if(req.files.photo){
                        const filePath = req.files.photo.path;
                        let fileSplit = path.resolve(filePath).split(path.sep);
                
                        let filename = fileSplit[fileSplit.length-1];
                
                        let fileExt = filename.split(".");
                        if(fileExt[fileExt.length-1] !== "jpg" && fileExt[fileExt.length-1] !== "jpeg" && fileExt[fileExt.length-1] !== "png"){
                            // res.status(400).send({msg: "Incorrect extension. Only use .jpg, .jpeg or .png"});
                            console.log('incorrect extension');
                        }else{
                            peripheral.photo = filename;
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
                        peripheral.images = filenames;
                    }

                    Peripheral.findByIdAndUpdate({_id: peripheralId}, peripheral, (err, peripheralData)=>{
                        if(err){
                            res.status(500).send({msg: err});
                        }else{
                            res.status(201).send({msg: "the peripheral has been update"});
                        }
                    });
                    
                }

            }
        });

        
    }catch(error){
        res.status(500).send(error);
    }
}

async function deletePeripheral(req, res){
    // delete a peripheral

    const peripheralId = req.params.id;
    const user = await authMiddleware.getUser(req, res);

    try{
        Peripheral.findById({_id: peripheralId}, (err, peripheralData) =>{
            if(err){
                res.status(500).send({msg: err});
            }else{
                let peripheral = peripheralData;

                if(!peripheral){
                    res.status(400).send({msg: "the peripheral does not exist"});
                }else if(peripheral.user_id != user.id){
                    res.status(403).send({msg: "Forbidden - Access to this resource on the server is denied!"});
                }else{
                    Peripheral.findByIdAndDelete({_id: peripheralId}, (err, peripheralResult) => {
                        if(err){
                            res.status(500).send({msg: err});
                        }else{
                            res.status(200).send({msg: "the peripheral has been delete"});
                        }
                    });
                }
            }
        });
        
    }catch(error){
        res.status(500).send(error);
    }
}

function getPeripheralImage(req, res){
    // show the avatar's image:

    const imageName = req.params.imageName;
    const filePath = `./uploads/images/peripherals/${imageName}`;

    fs.stat(filePath, (err, stat)=>{
        if(err){
            res.status(404).send({msg: "Peripheral image doesn't exists"});
        }else{
            res.sendFile(path.resolve(filePath));
        }
    });
}


module.exports = {
    getPeripherals,
    getPeripheral,
    postPeripheral,
    putPeripheral,
    deletePeripheral,
    getPeripheralImage
}