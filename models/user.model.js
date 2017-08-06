var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    location: {
        type: String,
        required: true
    },
    joinDate: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('User', UserSchema);
