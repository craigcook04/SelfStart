var mongoose = require("mongoose");

var questionSchema = mongoose.Schema({
    questionText: String,
    helpDescription: String,
    order: Number,
<<<<<<< HEAD
    form: {type: mongoose.Schema.ObjectId, ref: ('Forms')},
    questionType: {type: mongoose.Schema.ObjectId, ref: ('QuestionType')}
=======
    form: {type: mongoose.Schema.Types.ObjectId, ref: 'Forms'},
    questionType: {type: mongoose.Schema.Types.ObjectId, ref: 'QuestionType'}
>>>>>>> 6f4ef527b64e09d8f1be77fc7a65c914e81350d0
});

var Question = mongoose.model('Question', questionSchema);
exports.model = Question;
