//QUESTION TYPE ROUTE HANDLING
//========================================================

var express = require('express');
var router = express.Router();
var QuestionType = require('../models/questionType');

router.route('/')

    .post(function (request, response) {
        var questionType = new QuestionType();
        questionType.name = request.body.name;
        questionType.question = request.body.questionID;
        questionType.save(function (error) {
            if (error) {
                response.send(error);
            }
            
            response.json({questionType: questionType});
        });
    })

    .get(function (request, response) {
        QuestionType.find(function (error, questionType) {
            if (error) {
                response.send(error);
            }
            
            response.json({questionType: questionType});
        });
    });

//fetching a specific question Type. The options are to retrieve the question Type, update the question Type or delete the question Type

router.route('/:questionType_id')

    .get(function (request, response) {
        QuestionType.findById(request.params.questionType_id, function (error, questionType) {
            if (error) {
               response.send({error: error});
            }
            else {
               response.json({questionType: questionType});
            }
        });
    })

    .put(function (request, response) {
        QuestionType.findById(request.params.questionType_id, function (error, questionType) {
            if (error) {
                response.send({error: error});
            }
            else {
                
                //save updated information of the Question Type
                questionType.name = request.body.name;
                questionType.question = request.body.question;

                questionType.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({questionType: questionType});
                    }
                });
            }
        });
    })

    .delete(function (request, response) {
        QuestionType.findByIdAndRemove(request.params.questionType_id,
            function (error, deleted) {
                if (!error) {
                    response.json({questionType: deleted});
                }
            }
        );
    });
    
//get type id from name
router.route('/type/:typeName')
    .get(function (request, response) {
        QuestionType.find({name: request.params.typeName}, function (error, questionType) {
            if (error) {
               response.send({error: error});
            }
            else {
               response.json({questionType: questionType});
            }
        });
    });

module.exports = router;