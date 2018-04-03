var mongoose = require('mongoose');
var appointmentSchema = new mongoose.Schema(
    {
        date: Date,
        reason: String,
        other: String,
        images: [{type: mongoose.Schema.Types.ObjectId, ref: 'Image'}],
        userID: {type: mongoose.Schema.Types.ObjectId, ref: 'UserAccount'}
    }
);

var Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;