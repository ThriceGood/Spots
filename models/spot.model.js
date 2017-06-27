var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SpotSchema = new Schema({
    coords:                 String,
    name:                   String,
    address:                String,
    description:            String,
    uploadBy: 		        String,
    uploadDate: 	        String
})

module.exports = mongoose.model('Spot', SpotSchema);
