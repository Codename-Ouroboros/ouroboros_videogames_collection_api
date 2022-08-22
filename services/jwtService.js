const jwt = require('jsonwebtoken');

const SECRET_KEY = "a7asdf8xvf8576a6d8c9vqst";

function createToken(user, expiresIn){
    // create a new token with user id and email

    const {id, email} = user;
    const payload = {id, email};

    return jwt.sign(payload, SECRET_KEY, {expiresIn: expiresIn});
}

function decodeToken(token){
    // decode token 
    return jwt.decode(token, SECRET_KEY);
}

module.exports = {
    createToken,
    decodeToken
}