var mongoose = require('mongoose');
var exerciseSchema = new mongoose.Schema(
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
        rehabilitationPlans: {type: mongoose.Schema.Types.ObjectId, ref: 'RehabilitationPlans'}
    }
);

var Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;
