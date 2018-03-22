var mongoose = require("mongoose");

var assessmentTestSchema = new mongoose.Schema({
    name: String,
    description: String,
    completed: Boolean,
    dateCreated: Date,
    dateCompleted: Date,
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'Physiotherapist'},
    //belongsTo: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient'},
    questions: [],
    belongsTo: {type: mongoose.Schema.Types.ObjectId, ref: 'RehabilitationPlans'}
    
    
    // authorName: String,
    // recommendation: [{type: mongoose.Schema.Types.ObjectId, ref: 'Recommendation'}],
    // testResults: [{type: mongoose.Schema.Types.ObjectId, ref: 'TestResult'}],
    // rehabilitionPlans: [{type: mongoose.Schema.Types.ObjectId, ref: 'RehabilitionPlans'}]
});

var AssessmentTest = mongoose.model('AssessmentTest', assessmentTestSchema);
module.exports = AssessmentTest;