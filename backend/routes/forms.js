//routes for forms

var express = require('express');
var router = express.Router();
var Forms = require('../models/forms');

router.route('/')

    .post(function (request, response) {
        var form = new Forms();
        form.ID = request.body.ID;
        form.name = request.body.name;
        form.description = request.body.description;
        form.assessmentTool = null;
        //request.body.assessmentTool;
        form.questions = null;
        //request.body.questions;
        
        form.save(function (error) {
            if (error){
                response.send(error);
            } 
            response.json({form: form});
        });
    })
    
    .get(function (request, response) {
        Forms.find(function (error, form) {
            if (error){
                 response.send(error);
            }
            response.json({form: form});
        });
    });

//fetching a form with a desiginated ID
router.route('/:form_id')
    .get(function (request, response) {
        Forms.findById(request.params.form_id, function (error, form) {
            if (error) {
               response.send({error: error});
            }
            else {
               response.json({form: form});
            }
        });
    })

    .put(function (request, response) {
        Forms.findById(request.params.form_id, function (error, form) {
            if (error) {
                response.send({error: error});
            }
            else {

                //save updated info for the form
                form.ID = request.body.ID;
                form.name = request.body.name;
                form.description = request.body.description;
                form.assessmentTool = request.body.assessmentTool;
                form.questions = request.body.questions;

                form.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({form: form});
                    }
                });
            }
        });
    })

    //delete a form with a specific ID
    .delete(function (request, response) {
        Forms.findByIdAndRemove(request.params.form_id,
            function (error, deleted) {
                if (!error) {
                    response.json({form: deleted});
                }
            }
        );
    });

module.exports = router;
