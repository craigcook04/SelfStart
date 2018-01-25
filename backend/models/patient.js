var mongoose = require('mongoose');
var patientSchema = mongoose.Schema(
    {
        ID: String,
        familyName: String,
        givenName: String,
        email: String,
        DOB: Date,
        postalCode: String,
        phone: String,
        maritalStatus: String,
        healthCardNumber: String,
        occupation: String,
        others: String,
        account: {type: mongoose.Schema.ObjectId, ref: ('UserAccount')},
        payment: [{type: mongoose.Schema.ObjectId, ref: ('Payments')}],
        country: {type: mongoose.Schema.ObjectId, ref: ('Country')},
        province: {type: mongoose.Schema.ObjectId, ref: ('Province')},
        city: {type: mongoose.Schema.ObjectId, ref: ('City')},
        gender: {type: mongoose.Schema.ObjectId, ref: ('Gender')},
        appointment: [{type: mongoose.Schema.ObjectId, ref: ('Appointment')}]
    }
);

var Patient =  mongoose.model('patient', patientSchema);
exports.Model = Patient;