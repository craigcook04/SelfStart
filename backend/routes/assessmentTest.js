//ASSESSMENT TEST ROUTE HANDLING
//========================================================

var express = require('express');
var router = express.Router();
var AssessmentTest = require('../models/assessmentTest');

router.route('/')

    .post(function (request, response) {
        var assessmentTest = new AssessmentTest();
        assessmentTest.name = request.body.name;
        assessmentTest.description = request.body.description;
        assessmentTest.authorName = request.body.authorName;
        assessmentTest.recommendation = request.body.recommendation;
        assessmentTest.testResults = request.body.testResults;
        assessmentTest.rehabilitionPlans = request.body.rehabilationPlans;
        
        assessmentTest.save(function (error) {
            if (error) {
                response.send(error);
            }
            
            response.json({assessmentTest: assessmentTest});
        });
    })

    .get(function (request, response) {
        AssessmentTest.find(function (error, assessmentTest) {
            if (error) {
                response.send(error);
            }
            
            response.json({assessmentTest: assessmentTest});
        });
    });

//fetching a specific assessment test. This could then retrieve the test, modify the test or delete the test

router.route('/:assessment_id')

    .get(function (request, response) {
        AssessmentTest.findById(request.params.assessment_id, function (error, assessmentTest) {
            if (error) {
               response.send({error: error});
            }
            else {
               response.json({assessmentTest: assessmentTest});
            }
        });
    })

    .put(function (request, response) {
        AssessmentTest.findById(request.params.assessment_id, function (error, assessmentTest) {
            if (error) {
                response.send({error: error});
            }
            else {
                
                //save updated information of assessmentTest
                assessmentTest.name = request.body.name;
                assessmentTest.description = request.body.description;
                assessmentTest.authorName = request.body.authorName;
                assessmentTest.recommendation = request.body.recommendation;
                assessmentTest.testResults = request.body.testResults;
                assessmentTest.rehabilitionPlans = request.body.rehabilationPlans;
                
                assessmentTest.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({assessmentTest: assessmentTest});
                    }
                });
            }
        });
    })

    .delete(function (request, response) {
        AssessmentTest.findByIdAndRemove(request.params.assessment_id,
            function (error, deleted) {
                if (!error) {
                    response.json({assessmentTest: deleted});
                }
            }
        );
    });

module.exports = router;