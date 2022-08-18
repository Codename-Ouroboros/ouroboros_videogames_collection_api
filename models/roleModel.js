const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = Schema({
    name: {
        type: String,
        require: true
    },
    key: {
        type: String,
        require: true
    } 
});

module.exports = mongoose.model('roles', roleSchema);