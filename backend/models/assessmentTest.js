var mongoose = require("mongoose");
var assessmentTestSchema = mongoose.Schema({
    name: String,
    description: String,
    authorName: String,
    recommendation: [{type: mongoose.Schema.ObjectId, ref: ('Recommendation')}],
    testResults: [{type: mongoose.Schema.ObjectId, ref: ('TestResult')}],
    rehabilitionPlans: [{type: mongoose.Schema.ObjectId, ref: ('RehabilitionPlans')}]
});
var AssessmentTest = mongoose.model('assessmentTest', assessmentTestSchema);
exports.model = AssessmentTest;