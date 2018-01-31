//routes for rehabilitation plans

var express = require('express');
var router = express.Router();
var RehabPlans = require('../models/rehabilitationPlans');

router.route('/')
    .post(function (request, response) {
        var rehabPlans = new RehabPlans.Model(request.body.rehabPlans);
        rehabPlans.save(function (error) {
            if (error) response.send(error);
            response.json({rehabPlans: rehabPlans});
        });
    })
    .get(function (request, response) {
        RehabPlans.Model.find(function (error, rehabPlans) {
            if (error) response.send(error);
            response.json({rehabPlans: rehabPlans});
        });
    });

//getting a specific rehab plan
router.route('/:rehabPlans_id')
    .get(function (request, response) {
        RehabPlans.Model.findById(request.params.rehabPlans_id, function (error, rehabPlans) {
            if (error) {
               response.send({error: error});
            }
            else {
               response.json({rehabPlans: rehabPlans});
            }
        });
    })

    .put(function (request, response) {
        RehabPlans.Model.findById(request.params.rehabPlans_id, function (error, rehabPlans) {
            if (error) {
                response.send({error: error});
            }
            else {

                //save updated info of the rehab plan
                rehabPlans.name = request.body.name;
                rehabPlans.description = request.body.description;
                rehabPlans.authorName = request.body.authorName;
                rehabPlans.goal = request.body.goal;
                rehabPlans.timeFrameToComplete = request.body.timeFrameToComplete;
                rehabPlans.assessmentTests = request.body.assessmentTests;
                rehabPlans.exercises = request.body.exercises;
                rehabPlans.treatments = request.body.treatments;

                rehabPlans.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({rehabPlans: rehabPlans});
                    }
                });
            }
        });
    })

    //deleting a specific rehab plan
    .delete(function (request, response) {
        RehabPlans.Model.findByIdAndRemove(request.params.rehabPlans_id,
            function (error, deleted) {
                if (!error) {
                    response.json({rehabPlans: deleted});
                }
            }
        );
    });

module.exports = router;
