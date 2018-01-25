var mongoose = require('mongoose');
var userAccountSchema = mongoose.Schema(
    {
        userAccountName: String,
        encryptedPassword: String
    }
);

var UserAccount = mongoose.model('userAccount', userAccountSchema);
exports.Model = UserAccount;