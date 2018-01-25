var mongoose = require('mongoose');
var provinceSchema = mongoose.Schema(
    {
        name: String,
        country: {type: mongoose.Schema.ObjectId, ref: ('Country')},
        city: [{type: mongoose.Schema.ObjectId, ref: ('City')}],
        patient: [{type: mongoose.Schema.ObjectId, ref: ('Patient')}]
    }
);

var Province = mongoose.model('province', provinceSchema);
exports.Model = Province;