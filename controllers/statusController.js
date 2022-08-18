
const Status = require('../models/statusModel');

async function getStatusList(req, res){
    // returns a list of product status
    
    try{
        const status = await Status.find().sort({status: 1});

        if(status.length === 0){
            res.status(400).send({msg: "there are no status"});
        }else{
            res.status(200).send(status);
        }
    }catch(error){
        res.status(500).send(error);
    }
}

async function getStatus(req, res){
    // returns a status

    const statusId = req.params.id;

    try{
        const status = await Status.findById(statusId);

        if(!status){
            res.status(400).send({msg: "the status does not exist"});
        }else{
            res.status(200).send(status);
        }
    }catch(error){
        res.status(500).send(error);
    }
 
}

async function postStatus(req, res){
    // create a new status

    const status = new Status();
    const params = req.body;

    // body data:
    status.status = params.status;
    status.key = params.key;

    try{
        const statusStore = await status.save();

        if(!statusStore){
            res.status(400).send({msg: "error when saving the status"});
        }else{
            res.status(201).send({status: statusStore});
        }
    }catch(error){
        res.status(500).send(error);
    }
}

async function putStatus(req, res){
    // Update a status

    const statusId = req.params.id;
    const params = req.body;

    try{
        const status = await Status.findByIdAndUpdate(statusId, params);

        if(!status){
            res.status(400).send({msg: "the status does not exist"});
        }else{
            res.status(201).send({msg: "the status has been update"});
        }
    }catch(error){
        res.status(500).send(error);
    }
}

async function deleteStatus(req, res){
    // delete a status

    const statusId = req.params.id;

    try{
        const status = await Status.findByIdAndDelete(statusId);

        if(!status){
            res.status(400).send({msg: "the role does not exist"});
        }else{
            res.status(200).send({msg: "the role has been delete"});
        }
    }catch(error){
        res.status(500).send(error);
    }
}

module.exports = {
    getStatusList,
    getStatus,
    postStatus,
    putStatus,
    deleteStatus
}