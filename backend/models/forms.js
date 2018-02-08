var mongoose = require("mongoose");
var formsSchema = new mongoose.Schema({
    ID: String,
    name: String,
    description: String,
    assessmentTool: {type: mongoose.Schema.Types.ObjectId, ref: 'AssessmentTests'},
    questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],

});
var Forms = mongoose.model('Forms', formsSchema);
module.exports = Forms;
