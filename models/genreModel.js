const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = Schema({
    name: {
        type: String,
        require: true
    },
    key: {
        type: String,
        require: true,
        max: 3
    } 
});

module.exports = mongoose.model('genres', genreSchema);