const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const systemTypeSchema = Schema({
    type: {
        type: String,
        require: true
    },
    user_id: {
        type: ObjectId,
        require: true
    }
});

module.exports = mongoose.model('system_types', systemTypeSchema);