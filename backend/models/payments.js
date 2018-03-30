var mongoose = require('mongoose');
var paymentsSchema = new mongoose.Schema(
    {
        dayTimeStamp: Date,
        amount: Number,
        note: String,
        patient: String
    }
);

var Payments = mongoose.model('Payments', paymentsSchema);
module.exports = Payments;