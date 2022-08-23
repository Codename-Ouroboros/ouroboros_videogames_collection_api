
const Region = require('../models/regionModel');
const authMiddleware = require('../middlewares/authMiddleware');

async function getRegions(req, res){
    // returns a list of Region games

    const user = await authMiddleware.getUser(req, res);
    
    try{
        const region = await Region.find({user_id: user.id}).sort({region: 1});

        if(region.length === 0){
            res.status(400).send({msg: "there are no region"});
        }else{
            res.status(200).send(region);
        }
    }catch(error){
        res.status(500).send(error);
    }
}

async function getRegion(req, res){
    // returns a region

    const regionId = req.params.id;
    const user = await authMiddleware.getUser(req, res);

    try{
        const region = await Region.findById(regionId);

        if(!region){
            res.status(400).send({msg: "the region does not exist"});
        }else if(region.user_id != user.id){
            res.status(403).send({msg: "Forbidden - Access to this resource on the server is denied!"});
        }else{
            res.status(200).send(region);
        }
    }catch(error){
        res.status(500).send(error);
    }
 
}

async function postRegion(req, res){
    // create a new region

    const user = await authMiddleware.getUser(req, res);

    const region = new Region();
    const params = req.body;

    // body data:
    region.region = params.region;
    region.user_id = user.id;

    try{
        const regionStore = await region.save();

        if(!regionStore){
            res.status(400).send({msg: "error when saving the region"});
        }else{
            res.status(201).send({region: regionStore});
        }
    }catch(error){
        res.status(500).send(error);
    }
}

async function putRegion(req, res){
    // Update a region

    const regionId = req.params.id;
    const params = req.body;
    const user = await authMiddleware.getUser(req, res);

    try{
        let region = await Region.findById(regionId);

        if(!region){
            res.status(400).send({msg: "the region does not exist"});
        }else if(region.user_id != user.id){
            res.status(403).send({msg: "Forbidden - Access to this resource on the server is denied!"});
        }else{
            region = await Region.findByIdAndUpdate(regionId, params);
            res.status(201).send({msg: "the region has been update"});
        }
    }catch(error){
        res.status(500).send(error);
    }
}

async function deleteRegion(req, res){
    // delete a region

    const regionId = req.params.id;
    const user = await authMiddleware.getUser(req, res);

    try{
        let region = await Region.findById(regionId);

        if(!region){
            res.status(400).send({msg: "the region does not exist"});
        }else if(region.user_id != user.id){
            res.status(403).send({msg: "Forbidden - Access to this resource on the server is denied!"});
        }else{
            region = await Region.findByIdAndDelete(regionId);
            res.status(200).send({msg: "the region has been delete"});
        }
    }catch(error){
        res.status(500).send(error);
    }
}

module.exports = {
    getRegions,
    getRegion,
    postRegion,
    putRegion,
    deleteRegion
}