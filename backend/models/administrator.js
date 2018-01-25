var mongoose = require('mongoose');
var administratorSchema = mongoose.Schema(
    {
        ID: String,
        familyName: String,
        givenName: String,
        email: String,
        dateHired: Date,
        dateFinished: Date,
        account: {type: mongoose.Schema.ObjectId, ref: ('UserAccount')}
    }
);

var Administrator = mongoose.model('administrator', administratorSchema);
exports.Model = Administrator;