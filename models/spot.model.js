var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SpotSchema = new Schema({
    coords: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    uploadBy: {
        type: String,
        required: true
    },
    uploadDate: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Spot', SpotSchema);
