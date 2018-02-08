var mongoose = require('mongoose');

var userAccountSchema = mongoose.Schema(
    {
        userAccountName: String,
        encryptedPassword: String,
        adminUser: {type: mongoose.Schema.Types.ObjectId, ref: 'Administrator'},
        physioUser: {type: mongoose.Schema.Types.ObjectId, ref: 'Physiotherapist'},
        patientUser: {type: mongoose.Schema.Types.ObjectId, red: 'Patient'}
    }
);

var UserAccount = mongoose.model('UserAccount', userAccountSchema);
module.exports = UserAccount;