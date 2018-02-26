//images schema
var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema(
    {
        exercise: String,
        name: String,
        type: String,
        data: String,
        size: Number
    }
);

var Image = mongoose.model('Image', imageSchema);
module.exports = Image;