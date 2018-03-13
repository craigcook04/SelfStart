var mongoose = require("mongoose");

var assessmentTestSchema = new mongoose.Schema({
    name: String,
    description: String,
    completed: Boolean,
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'Physiotherapist'},
    belongsTo: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient'}
    
    
    // authorName: String,
    // recommendation: [{type: mongoose.Schema.Types.ObjectId, ref: 'Recommendation'}],
    // testResults: [{type: mongoose.Schema.Types.ObjectId, ref: 'TestResult'}],
    // rehabilitionPlans: [{type: mongoose.Schema.Types.ObjectId, ref: 'RehabilitionPlans'}]
});

var AssessmentTest = mongoose.model('AssessmentTest', assessmentTestSchema);
module.exports = AssessmentTest;