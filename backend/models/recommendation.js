var mongoose = require("mongoose");
var recommendationSchema = mongoose.Schema({
    timeStamp: Date,
    decision: String,
    test: {type: mongoose.Schema.ObjectId, ref: ('AssessmentTests')},
    response: {type: mongoose.Schema.ObjectId, ref: ('Treatments')}

});
var Recommendation = mongoose.model('recommendation', recommendationSchema);
exports.model = Recommendation;