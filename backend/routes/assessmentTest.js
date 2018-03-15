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
        assessmentTest.completed = request.body.completed;
        assessmentTest.creator = request.body.creator;
        assessmentTest.belongsTo = request.body.belongsTo;
        assessmentTest.questions = request.body.questions;
        assessmentTest.dateCreated = new Date();
        // assessmentTest.authorName = request.body.authorName;
        // assessmentTest.recommendation = request.body.recommendation;
        // assessmentTest.testResults = request.body.testResults;
        // assessmentTest.rehabilitionPlans = request.body.rehabilationPlans;
        
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
    
router.route('/client/completed')
    .put(function(request, response) {
        AssessmentTest.findById(request.body.assessmentID, function(error, assessmentTest) {
            if(error){
                response.send(error);
                return;
            }
            
            if(assessmentTest == null) {
                response.send({success: true, message: "could not retrieve the assessment test"});
                return;
            }
            
            assessmentTest.questions = request.body.questions;
            assessmentTest.completed = true;
            assessmentTest.dateCompleted = new Date();
            assessmentTest.save(function(err) {
                if(err) {
                    response.send(err);
                    return;
                }
                
                response.send({assessmentTest: assessmentTest, success: true});
            });
        });
    });

module.exports = router;