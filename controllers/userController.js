const bcryptjs = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const User = require('../models/userModel');
const jwt = require('../services/jwtService');
const authMiddleware = require('../middlewares/authMiddleware');

async function register(req, res){
    // Register users 

    const params = req.body;
    const user = new User(params);
    const {nickname, email, password} = params;

    try{
        if(!email) throw{ msg: "Email is required"};
        if(!password) throw{msg: "Password is required"};

        const emailExists = await User.findOne({email: email});
        if(emailExists) throw {msg: "Email already exists"};

        const nicknameExists = await User.findOne({nickname: nickname});
        if(nicknameExists) throw {msg: "Nickname already exists"};

        const salt = bcryptjs.genSaltSync(10);

        user.nickname = params.nickname;
        user.name = params.name;
        user.lastname = params.lastname;
        user.email = params.email;
        user.password = await bcryptjs.hash(password, salt);
        user.birthdate = params.birthdate;

        user.save();
        res.status(200).send(user);
    }catch(error){
        res.status(500).send(error);
    }
}

async function login(req, res){
    // login with jsonwebtoken

    const {email, password} = req.body;

    try{
        const user = await User.findOne({email: email});
        if(!user) throw {msg: "Email does not exist"};

        const passwordCorrect = await bcryptjs.compare(password, user.password);
        if(!passwordCorrect) throw {msg: "the password is wrong"};

        token = jwt.createToken(user, "12h");

        res.status(200).send({token: token});
    }catch(error){
        res.status(500).send(error);
    }
}

function updateUser(req, res){
    // upload a user's avatar

    const params = req.params;
    
    User.findById({_id: params.id}, async (err, userData) => {
        if(err){
            res.status(500).send({msg: "Server status error"});
        }else{
            if(!userData){
                res.status(404).send({msg: "User doesn't exists"});
            }else{
                const salt = bcryptjs.genSaltSync(10);
                let user = userData;
                let body = req.body;

                user.nickname = body.nickname;
                user.name = body.name;
                user.lastname = body.lastname;
                user.email = body.email;
                user.birthdate = body.birthdate;
                if(body.password){
                    user.password = await bcryptjs.hash(body.password, salt);
                }

                if(req.files.avatar){
                    const filePath = req.files.avatar.path;
                    let fileSplit = path.resolve(filePath).split(path.sep);

                    let filename = fileSplit[fileSplit.length-1];

                    let fileExt = filename.split(".");
                    if(fileExt[fileExt.length-1] !== "jpg" && fileExt[fileExt.length-1] !== "jpeg" && fileExt[fileExt.length-1] !== "png"){
                        // res.status(400).send({msg: "Incorrect extension. Only use .jpg, .jpeg or .png"});
                        console.log('incorrect extension');
                    }else{
                        user.avatar = filename;
                    }
                }

                User.findByIdAndUpdate({_id: params.id}, user, (err, userResult) => {
                    if(err){
                        res.status(404).send({msg: err});
                    }else{
                        res.status(200).send({msg: "User change succesfully"});
                    }
                });
            }
        }
    });
}

async function deleteUser(req, res){
    // delete a user

    const current_user = await authMiddleware.getUser(req, res);

    try{
        User.findById({_id: current_user.id}, (err, userData) =>{
            if(err){
                res.status(500).send({msg: err});
            }else{
                let user = userData;

                if(!user){
                    res.status(400).send({msg: "the user type does not exist"});
                }else{
                    User.findByIdAndDelete({_id: current_user.id}, (err, userResult) => {
                        if(err){
                            res.status(500).send({msg: err});
                        }else{      
                            res.status(200).send({msg: "the user has been delete"});
                        }
                    });
                }
            }
        });

    }catch(error){
        res.status(500).send(error);
    }
}

function getAvatar(req, res){
    // show the avatar's image:

    const avatarName = req.params.avatarName;
    const filePath = `./uploads/images/avatars/${avatarName}`;

    fs.stat(filePath, (err, stat)=>{
        if(err){
            res.status(404).send({msg: "Avatar doesn't exists"});
        }else{
            res.sendFile(path.resolve(filePath));
        }
    });
}

module.exports = {
    register,
    login,
    updateUser,
    getAvatar,
    deleteUser
}