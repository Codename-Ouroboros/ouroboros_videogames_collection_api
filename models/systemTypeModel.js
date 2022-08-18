const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const systemTypeSchema = Schema({
    type: {
        type: String,
        require: true
    },
    key: {
        type: String,
        require: true
    },
    logo: {
        type: String,
        require: false
    }
});

module.exports = mongoose.model('system_types', systemTypeSchema);