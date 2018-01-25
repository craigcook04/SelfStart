var mongoose = require('mongoose');
var countrySchema = mongoose.Schema(
    {
        name: String,
        province: [{type: mongoose.Schema.ObjectId, ref: ('Province')}],
        patient: [{type: mongoose.Schema.ObjectId, ref: ('Patient')}]
    }
);

var Country = mongoose.model('country', countrySchema);
exports.Model = Country;