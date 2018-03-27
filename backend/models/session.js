//This table is for storing all the sessions that are currently active, it maps user ID to a nonce that is specific to the session

var mongoose = require('mongoose');
var sessionSchema = new mongoose.Schema(
    {
        userID: String,
        nonce: String,
        opened: Date
    }
);

var Session = mongoose.model('Session', sessionSchema);
module.exports = Session;