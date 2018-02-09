var mongoose = require('mongoose');
var appointmentSchema = new mongoose.Schema(
    {
        date: Date,
        reason: String,
        other: String,
        patient: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient'}
    }
);

var Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;