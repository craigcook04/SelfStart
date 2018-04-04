//ASSESSMENT TEST ROUTE HANDLING
//========================================================

var express = require('express');
var router = express.Router();
var AssessmentTest = require('../models/assessmentTest');
var CompletedAssessment = require('../models/completedAssessmentTest');
var InitialIntake = require('../models/initialIntake');
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
    });
    
router.route('/getresults/:id')
    
    .get(function (request, response){
       CompletedAssessment.find({"userID": request.params.id}).sort({dateCompleted: 1}).exec(function(error, tests){
           if(error){
               response.send({error: error});
               return;
           }
           console.log("HERE");
           response.json({completedTests: tests});
       })
    });
    
router.route('/completedtest/:id')

    .post(function(request, response){
        let completedTest = new CompletedAssessment();
        completedTest.name = request.body.name;
        completedTest.description = request.body.descrip;
        completedTest.completed = false;
        let date = new Date();
        completedTest.dateCompleted = date;
        completedTest.physioRate = 0;
        completedTest.physioDescription = '';
        completedTest.questions = request.body.questions;
        completedTest.userID = request.params.id;
        completedTest.treatmentClosed = false
        
        InitialIntake.find({'userID': request.params.id}, function(err, injuries) {
            if(err) {
                response.send(err);
                return;
            }
            
            completedTest.injuryNumber = injuries.length;
            
            completedTest.save(function(err){
            if(err){
                response.send({error: err});
                return;
            }
            
            response.json({completedTest: completedTest});
        })
        })
    });
    
router.route('/completedtest/final/:id')
    .get(function(request, response) {
        console.log('variables sent to me', request.params.id, request.query.num);
        CompletedAssessment.findOne({'userID': request.params.id, 'injuryNumber': request.query.num, 'treatmentClosed': true}, function(err, results) {
            if(err) {
                response.send(err);
                return;
            }
            
            if(results == null) {
                response.send({success: false, message: 'this treatment is still ongoing'});
                return;
            }
            
            response.send({success: true, results: results});
        })
    })
    
router.route('/initial/completed')
    .post(function(request, response) {
        
        InitialIntake.find({'userID': request.body.userID}, function(err, injuries) {
            if(err) {
                response.send(err);
                return;
            }
            
            var initialIntake = new InitialIntake();
            initialIntake.injuryarea = request.body.injuryarea;
            initialIntake.painScale = request.body.painScale;
            initialIntake.started = request.body.started;
            initialIntake.dateStarted = new Date(request.body.dateStarted);
            initialIntake.describe = request.body.describe;
            initialIntake.ratePain = request.body.ratePain;
            initialIntake.weeklyPain = request.body.weeklyPain;
            initialIntake.aggravates = request.body.aggravates;
            initialIntake.easePain = request.body.easePain;
            initialIntake.morningPain = request.body.morningPain;
            initialIntake.eveningPain = request.body.eveningPain;
            initialIntake.treatment = request.body.treatment;
            initialIntake.moreThanOneSymptom = request.body.moreThanOneSymptom;
            initialIntake.hasOtherMedicalCondition = request.body.hasOtherMedicalCondition;
            initialIntake.describeOtherMedCondition = request.body.describeOtherMedCondition;
            initialIntake.symptoms = request.body.symptoms;
            initialIntake.medicalTraumas = request.body.medicalTraumas;
            initialIntake.explainTraumas = request.body.explainTraumas;
            initialIntake.occupation = request.body.occupation;
            initialIntake.hobbies = request.body.hobbies;
            initialIntake.goals = request.body.goals;
            initialIntake.userID = request.body.userID;
            initialIntake.injuryNumber = injuries.length + 1;
            
            initialIntake.save(function(err) {
                if(err) {
                    response.send(err);
                    return;
                }
                
                response.send({success: true, message: 'successfully filled out the initial intake form'});
            });
        });
    });
    
router.route('/initial/getbyid/:userID')
    .get(function(request, response) {
        InitialIntake.find({'userID': request.params.userID}, function(err, intakes) {
            if(err) {
                response.send(err);
                return;
            }
            
            response.send({intakes: intakes});
        });
    });

module.exports = router;