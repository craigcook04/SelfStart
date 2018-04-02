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
        physioRate: Number,
        physioDescription: String,
        patient: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient'}
    }
)

var CompletedAssessmentTest = mongoose.model('CompletedAssessmentTest', completedAssessmentTest);
module.exports = CompletedAssessmentTest;