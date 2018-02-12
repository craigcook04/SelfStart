var mongoose = require('mongoose');
var rehabilitationPlansSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        authorName: String,
        goal: String,
        timeFrameToComplete: Date,
        assessmentTests: [{type: mongoose.Schema.Types.ObjectId, ref: ('AssessmentTests')}],
        exercises: [{type: mongoose.Schema.Types.ObjectId, ref: ('Exercises')}],
        treatments: [{type: mongoose.Schema.Types.ObjectId, ref: ('Treatments')}],
        exerciseObjects: []
    }
);

var RehabilitationPlans = mongoose.model('RehabilitationPlans', rehabilitationPlansSchema);
module.exports = RehabilitationPlans;