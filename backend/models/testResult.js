var mongoose = require('mongoose');
var testResultSchema = mongoose.Schema(
    {   
        question: String,
        answer: String,
        assessmentTests: {type: mongoose.Schema.ObjectId, ref: ('AssessmentTests')}
    }
);

var TestResult = mongoose.model('testResult', testResultSchema);
exports.Model = TestResult;