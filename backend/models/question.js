var mongoose = require("mongoose");
var questionSchema = mongoose.Schema({
    questionText: String,
    helpDescription: String,
    order: Number,
    form: {type: mongoose.Schema.ObjectId, ref: ('Forms')},
    questionType: {type: mongoose.Schema.ObjectId, red: ('QuestionType')}
});
var Question = mongoose.model('question', questionSchema);
exports.model = Question;
