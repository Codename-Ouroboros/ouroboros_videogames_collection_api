
const Region = require('../models/regionModel');

async function getRegions(req, res){
    // returns a list of Region games
    
    try{
        const region = await Region.find().sort({region: 1});

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

    try{
        const region = await Region.findById(regionId);

        if(!region){
            res.status(400).send({msg: "the region does not exist"});
        }else{
            res.status(200).send(region);
        }
    }catch(error){
        res.status(500).send(error);
    }
 
}

async function postRegion(req, res){
    // create a new region

    const region = new Region();
    const params = req.body;

    // body data:
    region.region = params.region;
    region.logo = params.logo;

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

    try{
        const region = await Region.findByIdAndUpdate(regionId, params);

        if(!region){
            res.status(400).send({msg: "the region does not exist"});
        }else{
            res.status(201).send({msg: "the region has been update"});
        }
    }catch(error){
        res.status(500).send(error);
    }
}

async function deleteRegion(req, res){
    // delete a region

    const regionId = req.params.id;

    try{
        const region = await Region.findByIdAndDelete(regionId);

        if(!region){
            res.status(400).send({msg: "the region does not exist"});
        }else{
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