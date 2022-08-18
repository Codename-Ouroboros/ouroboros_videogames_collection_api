const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statusSchema = Schema({
    status: {
        type: String,
        require: true
    },
    key: {
        type: String,
        require: true
    } 
});

module.exports = mongoose.model('status', statusSchema);