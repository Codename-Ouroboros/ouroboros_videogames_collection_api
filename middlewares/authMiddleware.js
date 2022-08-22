const moment = require('moment');
const jwt = require('../services/jwtService');

const SECRET_KEY = "a7asdf8xvf8576a6d8c9vqst";

function ensureAuth(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({msg: "Forbidden - Access to this resource on the server is denied!"});
    }

    const token = req.headers.authorization.replace(/['"]+/g, "");

    try{
        const payload = jwt.decodeToken(token, SECRET_KEY);

        if(payload.exp <= moment().unix()){
            return res.status(400).send({msg: "the token has expired"});
        }

        req.user = payload;
        next();
    }catch(error){
        return res.status(404).send({msg: "Invalid token"});
    }
}

function getUser(req, res){
    const token = req.headers.authorization.replace(/['"]+/g, "");
    const payload = jwt.decodeToken(token, SECRET_KEY);

    return payload;
}

module.exports = {
    ensureAuth,
    getUser
}