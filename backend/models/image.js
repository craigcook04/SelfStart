//images schema
var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema(
    {
        //exercise: {type: mongoose.Schema.Types.ObjectId, ref: 'Exercise'},
        filelist: [{ data: String, contentType: String }]
    }
);

var Image = mongoose.model('Image', imageSchema);
module.exports = Image;