var mongoose = require('mongoose');
var userAccountSchema = mongoose.Schema(
    {
        userAccountName: String,
        encryptedPassword: String,
        adminUser: {type: mongoose.Schema.ObjectId, ref: ('Administrator')},
        physioUser: {type: mongoose.Schema.ObjectId, ref: ('Physiotherapist')},
        patientUser: {type: mongoose.Schema.ObjectId, red: ('Patient')}
    }
);

var UserAccount = mongoose.model('userAccount', userAccountSchema);
exports.Model = UserAccount;