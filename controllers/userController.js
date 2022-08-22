const bcryptjs = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('../services/jwtService');

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

module.exports = {
    register,
    login
}