//TEST RESULTS ROUTE HANDLING
//========================================================

var express = require('express');
var router = express.Router();
var TestResult = require('../models/testResult');

router.route('/')

    .post(function (request, response) {
        var testResult = new TestResult();
        testResult.question = request.body.question;
        testResult.answer = request.body.answer;
        
        testResult.save(function (error) {
            if (error) {
                response.send(error);
            }
            
            response.json({testResult: testResult});
        });
    })

    .get(function (request, response) {
        TestResult.find(function (error, testResult) {
            if (error) {
                response.send(error);
            }
            
            response.json({testResult: testResult});
        });
    });

//fetching a specific test result. The options are to retrieve the test result, update the test result or delete the test result

router.route('/:testResult_id')

    .get(function (request, response) {
        TestResult.findById(request.params.testResult_id, function (error, testResult) {
            if (error) {
               response.send({error: error});
            }
            else {
               response.json({testResult: testResult});
            }
        });
    })

    .put(function (request, response) {
        TestResult.findById(request.params.testResult_id, function (error, testResult) {
            if (error) {
                response.send({error: error});
            }
            else {
                
                //save updated information of test result
                testResult.question = request.body.question;
                testResult.answer = request.body.answer;

                testResult.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({testResult: testResult});
                    }
                });
            }
        });
    })

    .delete(function (request, response) {
        TestResult.findByIdAndRemove(request.params.testResult_id,
            function (error, deleted) {
                if (!error) {
                    response.json({testResult: deleted});
                }
            }
        );
    });

module.exports = router;