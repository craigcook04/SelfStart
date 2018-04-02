var mongoose  = require('mongoose');

var completedAssessmentTest = new mongoose.Schema( 
    {
        name: String,
        injuryNumber: String,
        description: String,
        completed: Boolean,
        dateCreated: Date,
        dateCompleted: Date,
        questions: [],
        patient: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient'}
    }
)

var CompletedAssessmentTest = mongoose.modal('CompletedAssessmentTest', completedAssessmentTest);
module.exports = CompletedAssessmentTest;