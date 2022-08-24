
const Status = require('../models/statusModel');
const authMiddleware = require('../middlewares/authMiddleware');

async function getStatusList(req, res){
    // returns a list of product status

    const user = await authMiddleware.getUser(req, res);
    
    try{
        const status = await Status.find({user_id: user.id}).sort({status: 1});

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
    const user = await authMiddleware.getUser(req, res);

    try{
        const status = await Status.findById(statusId);

        if(!status){
            res.status(400).send({msg: "the status does not exist"});
        }else if(status.user_id != user.id){
            res.status(403).send({msg: "Forbidden - Access to this resource on the server is denied!"});
        }else{
            res.status(200).send(status);
        }
    }catch(error){
        res.status(500).send(error);
    }
 
}

async function postStatus(req, res){
    // create a new status

    const user = await authMiddleware.getUser(req, res);

    const status = new Status();
    const params = req.body;

    // body data:
    status.status = params.status;
    status.user_id = user.id; 

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
    const user = await authMiddleware.getUser(req, res);

    try{
        Status.findById({_id: statusId}, (err, statusData) =>{
            if(err){
                res.status(500).send({msg: err});
            }else{
                let status = statusData;

                if(!status){
                    res.status(400).send({msg: "the status does not exist"});
                }else if(status.user_id != user.id){
                    res.status(403).send({msg: "Forbidden - Access to this resource on the server is denied!"});
                }else{
                    status.status = params.status;
    
                    Status.findByIdAndUpdate({_id: statusId}, status, (err, statusResult) => {
                        if(err){
                            res.status(500).send({msg: err});
                        }else{
                            res.status(201).send({msg: "the status has been update"});
                        } 
                    });
                }
            }
        });

        
    }catch(error){
        res.status(500).send(error);
    }
}

async function deleteStatus(req, res){
    // delete a status

    const statusId = req.params.id;
    const user = await authMiddleware.getUser(req, res);

    try{
        let status = await Status.findById(statusId);

        if(!status){
            res.status(400).send({msg: "the status does not exist"});
        }else if(status.user_id != user.id){
            res.status(403).send({msg: "Forbidden - Access to this resource on the server is denied!"});
        }else{
            status = await Status.findByIdAndDelete(statusId);
            res.status(200).send({msg: "the status has been delete"});
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