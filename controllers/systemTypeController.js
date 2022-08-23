
const SystemType = require('../models/systemTypeModel');
const authMiddleware = require('../middlewares/authMiddleware');

async function getSystemTypes(req, res){
    // returns a list of System types

    const user = await authMiddleware.getUser(req, res);
    
    try{
        const systemType = await SystemType.find({user_id: user.id}).sort({type: 1});

        if(systemType.length === 0){
            res.status(400).send({msg: "there are no System Type"});
        }else{
            res.status(200).send(systemType);
        }
    }catch(error){
        res.status(500).send(error);
    }
}

async function getSystemType(req, res){
    // returns a system type

    const systemTypeId = req.params.id;
    const user = await authMiddleware.getUser(req, res);

    try{
        const systemType = await SystemType.findById(systemTypeId);

        if(!systemType){
            res.status(400).send({msg: "the system type does not exist"});
        }else if(systemType.user_id != user.id){
            res.status(403).send({msg: "Forbidden - Access to this resource on the server is denied!"});
        }else{
            res.status(200).send(systemType);
        }
    }catch(error){
        res.status(500).send(error);
    }
 
}

async function postSystemType(req, res){
    // create a new system type

    const user = await authMiddleware.getUser(req, res);

    const systemType = new SystemType();
    const params = req.body;

    // body data:
    systemType.type = params.type;
    systemType.key = params.key;
    systemType.logo = params.logo;
    systemType.user_id = user.id;

    try{
        const systemTypeStore = await systemType.save();

        if(!systemTypeStore){
            res.status(400).send({msg: "error when saving the system type"});
        }else{
            res.status(201).send({system_type: systemTypeStore});
        }
    }catch(error){
        res.status(500).send(error);
    }
}

async function putSystemType(req, res){
    // Update a system type

    const systemTypeId = req.params.id;
    const params = req.body;
    const user = await authMiddleware.getUser(req, res);

    try{
        let systemType = await SystemType.findById(systemTypeId);

        if(!systemType){
            res.status(400).send({msg: "the system type does not exist"});
        }else if(systemType.user_id != user.id){
            res.status(403).send({msg: "Forbidden - Access to this resource on the server is denied!"});
        }else{
            systemType = await SystemType.findByIdAndUpdate(systemTypeId, params);
            res.status(201).send({msg: "the system type has been update"});
        }

    }catch(error){
        res.status(500).send(error);
    }
}

async function deleteSystemType(req, res){
    // delete a systemType

    const systemTypeId = req.params.id;
    const user = await authMiddleware.getUser(req, res);

    try{
        let systemType = await SystemType.findById(systemTypeId);

        if(!systemType){
            res.status(400).send({msg: "the system type does not exist"});
        }else if(systemType.user_id != user.id){
            res.status(403).send({msg: "Forbidden - Access to this resource on the server is denied!"});
        }else{
            systemType = await SystemType.findByIdAndDelete(systemTypeId);
            res.status(200).send({msg: "the system type has been delete"});
        }
    }catch(error){
        res.status(500).send(error);
    }
}

module.exports = {
    getSystemTypes,
    getSystemType,
    postSystemType,
    putSystemType,
    deleteSystemType
}