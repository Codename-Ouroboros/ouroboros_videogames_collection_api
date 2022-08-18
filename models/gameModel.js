const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const gameSchema = Schema({
    title: {
        type: String,
        require: true,
        max: 50
    },
    region: {
        type: ObjectId,
        require: false
    },
    cover: {
        type: String,
        require: false
    },
    photos: {
        type: Array,
        require: false
    }, 
    text_logo: {
        type: String,
        require: false
    },
    developer: {
        type: ObjectId,
        require: false
    },
    producer: {
        type: ObjectId,
        require: false
    },
    players: {
        type: Number,
        require: false
    },
    plot: {
        type: String,
        require: false,
        max: 500
    },
    system: {
        type: ObjectId,
        require: false
    },
    status: {
        type: ObjectId,
        require: false 
    },
    genre: {
        type: ObjectId,
        require: false
    },
    release_date: {
        type: Date,
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
});

module.exports = mongoose.model('games', gameSchema);