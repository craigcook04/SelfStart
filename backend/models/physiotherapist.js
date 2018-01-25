var mongoose = require('mongoose');
var physiotherapistSchema = mongoose.Schema(
    {
        ID: String,
        familyName: String,
        givenName: String,
        email: String,
        dateHired: Date,
        dateFinished: Date,
        account: {type: mongoose.Schema.ObjectId, ref: ('UserAccount')},
        treatments: [{type: mongoose.Schema.ObjectId, ref: ('Treatments')}]
    }
);

var Physiotherapist =  mongoose.model('physiotherapist', physiotherapistSchema);
exports.Model = Physiotherapist;