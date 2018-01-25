var mongoose = require('mongoose');
var citySchema = mongoose.Schema(
    {
        name: String,
        province: {type: mongoose.Schema.ObjectId, ref: ('Province')},
        patient: [{type: mongoose.Schema.ObjectId, ref: ('Patient')}]
    }
);

var City = mongoose.model('city', citySchema);
exports.Model = City;