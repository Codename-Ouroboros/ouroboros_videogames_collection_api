const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const systemSchema = Schema({
    model: {
        type: String,
        require: true
    },
    brand: {
        type: ObjectId,
        require: true
    },
    logo: {
        type: String,
        require: false
    },
    image: {
        type: String,
        require: false
    }, 
    text_logo: {
        type: String,
        require: false
    },
    type_system: {
        type: ObjectId,
        require: true
    },
    ean: {
        type: String,
        require: false
    },
    serial: {
        type: String,
        require: false
    },
});

module.exports = mongoose.model('systems', systemSchema);