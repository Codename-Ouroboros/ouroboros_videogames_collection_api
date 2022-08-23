const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const companySchema = Schema({
    name: {
        type: String,
        require: true
    },
    logo: {
        type: String,
        require: false
    },
    user_id: {
        type: ObjectId, 
        require: true
    }
});

module.exports = mongoose.model('companies', companySchema);