var mongoose = require('mongoose');
var rehabilitationPlansSchema = mongoose.Schema(
    {
        name: String,
        description: String,
        authorName: String,
        goal: String,
        timeFrameToComplete: Date,
        assessmentTests: {type: mongoose.Schema.ObjectId, ref: ('AssessmentTests')},
        exercises: {type: mongoose.Schema.ObjectId, ref: ('Exercises')},
        treatments: {type: mongoose.Schema.ObjectId, ref: ('Treatments')}
    }
);

var RehabilitationPlans = mongoose.model('rehabilitationPlans', rehabilitationPlansSchema);
exports.Model = RehabilitationPlans;