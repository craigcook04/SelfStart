var mongoose = require('mongoose');
var paymentsSchema = mongoose.Schema(
    {
        dayTimeStamp: Date,
        amount: double,
        note: String,
        patient: {type: mongoose.Schema.ObjectId, ref: ('Patient')}
    }
);

var Payments = mongoose.model('payments', paymentsSchema);
exports.Model = Payments;