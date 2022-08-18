
const Peripheral = require('../models/peripheralModel');

async function getPeripherals(req, res){
    // returns a list of peripherals
    
    try{
        const peripherals = await Peripheral.find().sort({name: 1});

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

    try{
        const peripheral = await Peripheral.findById(peripheralId);

        if(!peripheral){
            res.status(400).send({msg: "the peripheral does not exist"});
        }else{
            res.status(200).send(peripheral);
        }
    }catch(error){
        res.status(500).send(error);
    }
 
}

async function postPeripheral(req, res){
    // create a new peripheral

    const peripheral = new Peripheral();
    const params = req.body;

    // body data:
    peripheral.name = params.name;
    peripheral.brand = params.brand;
    peripheral.system = params.system;
    peripheral.images = params.images;
    peripheral.status = params.status;
    peripheral.ean = params.ean;
    peripheral.serial = params.serial;

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

    try{
        const peripheral = await Peripheral.findByIdAndUpdate(peripheralId, params);

        if(!peripheral){
            res.status(400).send({msg: "the peripheral does not exist"});
        }else{
            res.status(201).send({msg: "the peripheral has been update"});
        }
    }catch(error){
        res.status(500).send(error);
    }
}

async function deletePeripheral(req, res){
    // delete a peripheral

    const peripheralId = req.params.id;

    try{
        const peripheral = await Peripheral.findByIdAndDelete(peripheralId);

        if(!peripheral){
            res.status(400).send({msg: "the peripheral does not exist"});
        }else{
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