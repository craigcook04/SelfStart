var mongoose = require('mongoose');
var exerciseSchema = mongoose.Schema(
    {
        name: String,
        description: String,
        objectives: String,
        authorName: String,
        actionSteps: String,
        location: String,
        frequency: Number,
        duration: Number,
        targetDate: Date,
        multimedia: String,
        rehabilitationPlans: {type: mongoose.Schema.ObjectId, ref: ('RehabilitationPlans')}
    }
);

var Exercise = mongoose.model('exercise', exerciseSchema);
exports.Model = Exercise;
