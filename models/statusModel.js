const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const statusSchema = Schema({
    status: {
        type: String,
        require: true
    },
    user_id: {
        type: ObjectId,
        require: true
    }
});

module.exports = mongoose.model('status', statusSchema);