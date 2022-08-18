
const Role = require('../models/roleModel');

async function getRoles(req, res){
    // returns a list of users role
    
    try{
        const roles = await Role.find().sort({name: 1});

        if(roles.length === 0){
            res.status(400).send({msg: "there are no roles"});
        }else{
            res.status(200).send(roles);
        }
    }catch(error){
        res.status(500).send(error);
    }
}

async function getRole(req, res){
    // returns a role

    const roleId = req.params.id;

    try{
        const role = await Role.findById(roleId);

        if(!role){
            res.status(400).send({msg: "the role does not exist"});
        }else{
            res.status(200).send(role);
        }
    }catch(error){
        res.status(500).send(error);
    }
 
}

async function postRole(req, res){
    // create a new role

    const role = new Role();
    const params = req.body;

    // body data:
    role.name = params.name;
    role.key = params.key;

    try{
        const roleStore = await role.save();

        if(!roleStore){
            res.status(400).send({msg: "error when saving the role"});
        }else{
            res.status(201).send({role: roleStore});
        }
    }catch(error){
        res.status(500).send(error);
    }
}

async function putRole(req, res){
    // Update a role

    const roleId = req.params.id;
    const params = req.body;

    try{
        const role = await Role.findByIdAndUpdate(roleId, params);

        if(!role){
            res.status(400).send({msg: "the role does not exist"});
        }else{
            res.status(201).send({msg: "the role has been update"});
        }
    }catch(error){
        res.status(500).send(error);
    }
}

async function deleteRole(req, res){
    // delete a role

    const roleId = req.params.id;

    try{
        const role = await Role.findByIdAndDelete(roleId);

        if(!role){
            res.status(400).send({msg: "the role does not exist"});
        }else{
            res.status(200).send({msg: "the role has been delete"});
        }
    }catch(error){
        res.status(500).send(error);
    }
}

module.exports = {
    getRoles,
    getRole,
    postRole,
    putRole,
    deleteRole
}