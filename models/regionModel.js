const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const regionSchema = Schema({
    region: {
        type: String,
        require: true
    },
    logo: {
        type: String,
        require: false,
    } 
});

module.exports = mongoose.model('regions', regionSchema);