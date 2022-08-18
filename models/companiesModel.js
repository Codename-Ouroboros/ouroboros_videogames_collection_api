const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companiesSchema = Schema({
    name: {
        type: String,
        require: true
    },
    logo: {
        type: String,
        require: false
    } 
});

module.exports = mongoose.model('Companie', companiesSchema);