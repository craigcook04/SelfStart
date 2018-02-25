var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var patientSchema = new mongoose.Schema(
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
        account: {type: mongoose.Schema.Types.ObjectId, ref: 'UserAccount'},
        payment: [{type: mongoose.Schema.Types.ObjectId, ref: 'Payments'}],
        country: {type: mongoose.Schema.Types.ObjectId, ref: 'Country'},
        province: {type: mongoose.Schema.Types.ObjectId, ref: 'Province'},
        city: {type: mongoose.Schema.Types.ObjectId, ref: 'City'},
        gender: {type: mongoose.Schema.Types.ObjectId, ref: 'Gender'},
        appointment: [{type: mongoose.Schema.Types.ObjectId, ref: 'Appointment'}]
    }
);

//This should work
patientSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
};

var Patient =  mongoose.model('Patient', patientSchema);
module.exports = Patient;