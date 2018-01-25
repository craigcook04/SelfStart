var mongoose = require('mongoose');
var appointmentSchema = mongoose.Schema(
    {
        date: Date,
        reason: String,
        other: String,
        patient: {type: mongoose.Schema.ObjectId, ref: ('Patient')}
    }
);

var Appointment = mongoose.model('appointment', appointmentSchema);
exports.Model = Appointment;