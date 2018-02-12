//QUESTION ROUTE HANDLING
//========================================================

var express = require('express');
var router = express.Router();
var Question = require('../models/question');

router.route('/')

    .post(function (request, response) {
        var question = new Question();
        question.questionText = request.body.questionText;
        question.helpDescription = request.body.helpDescription;
        question.order = request.body.order;
        question.form = request.body.form;
        question.questionType = request.body.questionType;
        
        question.save(function (error) {
            if (error) {
                response.send(error);
            }
            
            response.json({question: question});
        });
    })

    .get(function (request, response) {
        Question.find({form: request.query.form}, function (error, question) {
            if (error) {
                response.send(error);
            }
            
            response.json({question: question});
        });
    });

//fetching a specific question. The options are to retrieve the question, update the question or delete the question

router.route('/:question_id')

    .get(function (request, response) {
        Question.findById(request.params.question_id, function (error, question) {
            if (error) {
               response.send({error: error});
            }
            else {
               response.json({question: question});
            }
        });
    })

    .put(function (request, response) {
        Question.findById(request.params.question_id, function (error, question) {
            if (error) {
                response.send({error: error});
            }
            else {
                
                //save updated information of question
                question.questionText = request.body.questionText;
                question.helpDescription = request.body.helpDescription;
                question.order = request.body.order;
                question.form = request.body.form;
                question.questionType = request.body.questionType;

                question.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({question: question});
                    }
                });
            }
        });
    })

    .delete(function (request, response) {
        Question.findByIdAndRemove(request.params.question_id,
            function (error, deleted) {
                if (!error) {
                        response.json({question: deleted});
                }
            }
        );
    });

module.exports = router;