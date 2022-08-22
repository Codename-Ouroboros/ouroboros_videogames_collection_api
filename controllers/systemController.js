
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
    system.logo = params.logo;
    system.images = params.images;
    system.status = params.status;
    system.text_logo = params.text_logo;
    system.type_system = params.type_system;
    system.ean = params.ean;
    system.serial = params.serial;
    system.user_id = user.id; 

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
        let system = await System.findById(systemId);

        if(system.user_id != user.id){
            res.status(403).send({msg: "Forbidden - Access to this resource on the server is denied!"});
        }

        system = await System.findByIdAndUpdate(systemId, params);


        if(!system){
            res.status(400).send({msg: "the system does not exist"});
        }else{
            res.status(201).send({msg: "the system has been update"});
        }
    }catch(error){
        res.status(500).send(error);
    }
}

async function deleteSystem(req, res){
    // delete a system

    const systemId = req.params.id;

    try{
        const system = await System.findByIdAndDelete(systemId);

        if(!system){
            res.status(400).send({msg: "the system does not exist"});
        }else{
            res.status(200).send({msg: "the system has been delete"});
        }
    }catch(error){
        res.status(500).send(error);
    }
}

module.exports = {
    getSystems,
    getSystem,
    postSystem,
    putSystem,
    deleteSystem
}