var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userAccountSchema = mongoose.Schema(
    {
        userAccountName: String,
        encryptedPassword: String,
        adminUser: {type: mongoose.Schema.Types.ObjectId, ref: 'Administrator'},
        physioUser: {type: mongoose.Schema.Types.ObjectId, ref: 'Physiotherapist'},
        patientUser: {type: mongoose.Schema.Types.ObjectId, red: 'Patient'}
    }
);

//This should work
userAccountSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
};

var UserAccount = mongoose.model('UserAccount', userAccountSchema);
module.exports = UserAccount;