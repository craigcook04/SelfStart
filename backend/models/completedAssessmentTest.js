var mongoose  = require('mongoose');

var completedAssessmentTest = new mongoose.Schema( 
    {
        name: String,
        injuryNumber: String,
        description: String,
        completed: Boolean,
        treatmentClosed: Boolean,
        closedFinalThoughts: String,
        dateCompleted: Date,
        dateClosed: Date,
        questions: [],
        physioRate: Number,
        physioDescription: String,
        userID: {type: mongoose.Schema.Types.ObjectId, ref: 'UserAccount'}
    }
)

var CompletedAssessmentTest = mongoose.model('CompletedAssessmentTest', completedAssessmentTest);
module.exports = CompletedAssessmentTest;