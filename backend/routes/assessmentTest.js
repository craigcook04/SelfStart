//ASSESSMENT TEST ROUTE HANDLING
//========================================================

var express = require('express');
var router = express.Router();
var AssessmentTest = require('../models/assessmentTest');
var CompletedAssessment = require('../models/completedAssessmentTest');
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

        // AssessmentTest.find().populate('belongsTo').exec(function (error, assessmentTest) {
        //     if (error) {
        //         response.send(error);
        //     }
            
        //     response.json({assessmentTest: assessmentTest});
        //});
         var query = {};
        if(request.query.s == "ID"){
            
            query['ID'] = Number(request.query.q);
        }
        else if(request.query.q != null || request.query.q != undefined) {
            //if the query string isn't null, set the query to search for the query string
            var search = '^' + request.query.q;
            var regexexp = new RegExp(search, 'i');
            query[request.query.s] = regexexp;
        }
        else{
            query = {};
        }
        
        var sortOrder;
        if(request.query.sortorder == 'asc') {
            sortOrder = 1;
        }
        else {
            sortOrder = -1;
        }
        
        var myparameter = request.query.s;
        var sort ={};
        sort[myparameter] = sortOrder;
        var options = 
        {
            sort: sort,
            populate: ['belongsTo'],
            limit: 10,
            offset: Number(request.query.offset)
        };
        
        AssessmentTest.paginate(query, options, function(err, results) {
            if(err) {
                console.log(err);
                response.send(err);
// =======
//         AssessmentTest.find().populate('belongsTo').exec(function (error, assessmentTest) {
//             if (error) {
//                 response.send({error: error});
// >>>>>>> 68ffc52ae9893ccf74363ccc9257eb369218d3f0
                return;
            }
            
            response.send(results);
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
        console.log("Here");
       CompletedAssessment.find({"patient": request.params.id}).sort({dateCompleted: 1}), function(error, tests){
           if(error){
               response.send({error: error});
               return;
           }
           
           if(tests === null || tests === undefined){ console.log("None")};
           response.send({completedTests: tests});
       }
    })
router.route('/completedTests')

    .post(function(request,response){
        var completedAssessment = new CompletedAssessment();
        completedAssessment.name = request.body.name;
        completedAssessment.description = request.body.description;
        completedAssessment.completed = true;
        completedAssessment.dateCompleted = request.body.dateCompleted;
        completedAssessment.dateCreated = request.body.dateCreated;
        completedAssessment.questions = request.body.questions;
        completedAssessment.physioRate = request.body.physioRate;
        completedAssessment.physioDescription = request.body.physioDescription;
        completedAssessment.patient =request.body.patient;
        
        completedAssessment.save(function (error) {
            if (error) {
                response.send(error);
                return;
            }
            
            response.json({completedAssessment: completedAssessment});
        });
        
        
        
    })

module.exports = router;