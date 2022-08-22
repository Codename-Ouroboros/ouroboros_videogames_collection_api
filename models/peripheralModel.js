const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const peripheralSchema = Schema({
    name: {
        type: String,
        require: true
    },
    brand: {
        type: ObjectId,
        require: true
    },
    system: {
        type: ObjectId,
        require: false
    },
    images: {
        type: Array,
        require: false
    }, 
    status: {
        type: ObjectId,
        require: false
    },
    ean: {
        type: String,
        require: false
    },
    serial: {
        type: String,
        require: false
    },
    user_id: {
        type: ObjectId,
        require: true
    }
});

module.exports = mongoose.model('peripherals', peripheralSchema);