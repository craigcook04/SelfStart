//ASSESSMENT TEST ROUTE HANDLING
//========================================================

var express = require('express');
var router = express.Router();
var AssessmentTest = require('../models/assessmentTest');
// var Session = require('../models/session');

// router.use(function(req, res, next){
//   // do logging
//   Session.findOne(req.params.token, function(err, session) {
//       if(err) {
//           res.send(err);
//           return;
//       }
//       if(session == null) {
//         res.status(401).send({error: "Unauthorized to access this content"});
//         return;
//       }
//       else{
//           //the user has a valid session token
//           next();
//       }
//   });
// });

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
                return;
            }
            
            response.json({assessmentTest: assessmentTest});
        });
    })

    .get(function (request, response) {
        AssessmentTest.find().populate('belongsTo').exec(function (error, assessmentTest) {
            if (error) {
                response.send({error: error});
                return;
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
               return;
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
                return;
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
                        return;
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
                response.send({error: error});
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
                    response.send({error: err});
                    return;
                }
                
                response.json({assessmentTest: assessmentTest, success: true});
            });
        });
    });
    
router.route('/putquestions/:id')

    .put(function(request, response){
        AssessmentTest.findByID(request.params.id, function(error, assessmentTest){
            if(error){
                response.send({error: error});
                return;
            }
            
            assessmentTest.questions = request.body.questions;
            assessmentTest.save(function(err){
                if(error){
                    response.send({error: err})
                    return;
                }
                response.json({test: assessmentTest});
            })
        })
    })

module.exports = router;