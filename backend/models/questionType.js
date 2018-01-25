var mongoose = require("mongoose");
var questionTypeSchema = mongoose.Schema({
    name: String,
    question: [{type: mongoose.Schema.ObjectId, ref: ('Question')}]
});
var QuestionType = mongoose.model('questionType', questionTypeSchema);
exports.model = QuestionType;