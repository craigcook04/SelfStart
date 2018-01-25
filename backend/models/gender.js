var mongoose = require('mongoose');
var genderSchema = mongoose.Schema(
    {
        name: String,
        patient: [{type: mongoose.Schema.ObjectId, ref: ('Patient')}]
    }
);

var Gender = mongoose.model('gender', genderSchema);
exports.Model = Gender;