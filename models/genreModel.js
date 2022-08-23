const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const genreSchema = Schema({
    name: {
        type: String,
        require: true
    },
    user_id: {
        type: ObjectId,
        require: true
    }
});

module.exports = mongoose.model('genres', genreSchema);