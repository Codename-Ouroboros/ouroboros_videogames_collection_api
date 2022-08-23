const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = Schema({
    nickname: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: false
    },
    lastname: {
        type: String,
        require: false
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    birthdate: {
        type: Date,
        require: false
    },
    password: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        require: false
    }
});

module.exports = mongoose.model('users', userSchema);