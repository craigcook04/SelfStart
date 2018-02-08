//exercise route handling

var express = require('express');
var router = express.Router();
var Exercise = require('../models/exercises');

router.route('/')

    .post(function (request, response) {
        var exercise = new Exercise.Model();
        exercise.name = request.body.name;
        exercise.description = request.body.description;
        exercise.objectives = request.body.objectives;
        exercise.authorName = request.body.authorName;
        exercise.actionSteps = request.body.actionSteps;
        exercise.location = request.body.location;
        exercise.frequency = request.body.frequency;
        exercise.duration = request.body.duration;
        exercise.targetDate = request.body.targetDate;
        exercise.multimedia = request.body.multimedia;
        exercise.rehabilitationPlans = request.body.rehabilationPlans;
        
        exercise.save(function (error) {
            if (error) {
                response.send(error);
            }
            
            response.json({exercise: exercise});
        });
    })

    .get(function (request, response) {
        Exercise.Model.find(function (error, exercises) {
            if (error) response.send(error);
            response.json({exercise: exercises});
        }).sort({name: 1});
    });

//fetching a specific exercise

router.route('/:exercise_id')

    .get(function (request, response) {
        Exercise.Model.findById(request.params.exercise_id, function (error, exercise) {
            if (error) {
               response.send({error: error});
            }
            else {
               response.json({exercise: exercise});
            }
        });
    })

    .put(function (request, response) {
        Exercise.Model.findById(request.params.exercise_id, function (error, exercise) {
            if (error) {
                response.send({error: error});
            }
            else {
                
                //save updated information of exercise
                exercise.name = request.body.name;
                exercise.description = request.body.description;
                exercise.objectives = request.body.objectives;
                exercise.authorName = request.body.authorName;
                exercise.actionSteps = request.body.actionSteps;
                exercise.location = request.body.location;
                exercise.frequency = request.body.frequency;
                exercise.duration = request.body.duration;
                exercise.targetDate = request.body.targetDate;
                exercise.multimedia = request.body.multimedia;
                exercise.rehabilationPlans = request.body.rehabilitationPlans;              

                exercise.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({exercise: exercise});
                    }
                });
            }
        });
    })

    .delete(function (request, response) {
        Exercise.Model.findByIdAndRemove(request.params.exercise_id,
            function (error, deleted) {
                if (!error) {
                    response.json({exercise: deleted});
                }
            }
        );
    });

module.exports = router;