
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
    peripheral.photo = params.photo;
    peripheral.images = params.images;
    peripheral.status = params.status;
    peripheral.ean = params.ean;
    peripheral.serial = params.serial;
    peripheral.user_id = user.id;

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
        let peripheral = await Peripheral.findById(peripheralId);

        if(!peripheral){
            res.status(400).send({msg: "the peripheral does not exist"});
        }else if(peripheral.user_id != user.id){
            res.status(403).send({msg: "Forbidden - Access to this resource on the server is denied!"});
        }else{        
            peripheral = await Peripheral.findByIdAndUpdate(peripheralId, params);
            res.status(201).send({msg: "the peripheral has been update"});
        }
    }catch(error){
        res.status(500).send(error);
    }
}

async function deletePeripheral(req, res){
    // delete a peripheral

    const peripheralId = req.params.id;
    const user = await authMiddleware.getUser(req, res);

    try{
        let peripheral = await Peripheral.findById(peripheralId);

        if(!peripheral){
            res.status(400).send({msg: "the peripheral does not exist"});
        }else if(peripheral.user_id != user.id){
            res.status(403).send({msg: "Forbidden - Access to this resource on the server is denied!"});
        }else{
            peripheral = await Peripheral.findByIdAndDelete(peripheralId);
            res.status(200).send({msg: "the peripheral has been delete"});
        }
    }catch(error){
        res.status(500).send(error);
    }
}

module.exports = {
    getPeripherals,
    getPeripheral,
    postPeripheral,
    putPeripheral,
    deletePeripheral
}