var mongoose = require("mongoose");
var formsSchema = mongoose.Schema({
    ID: String,
    name: String,
    description: String,
    assessmentTool: {type: mongoose.Schema.ObjectId, ref: ('AssessmentTests')},
    questions: [{type: mongoose.Schema.ObjectId, ref: ('Question')}],

});
var Forms = mongoose.model('forms', formsSchema);
exports.model = Forms;
