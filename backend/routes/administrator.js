//ADMINISTRATOR ROUTE HANDLING
// NOTE: THIS IS TEMPORARY, IT WILL NEED TO BE CHANGED AS ADDITIONAL FUNCTIONALITY IS NEEDED
//========================================================

var express = require('express');
var router = express.Router();
var Administrator = require('../models/administrator');

router.route('/')

    .post(function (request, response) {
        var administrator = new Administrator.Model(request.body.administrator);
        administrator.save(function (error) {
            if (error) {
                response.send(error);
            }
            
            response.json({administrator: administrator});
        });
    })

    .get(function (request, response) {
        Administrator.Model.find(function (error, administrator) {
            if (error) {
                response.send(error);
            }
            
            response.json({administrator: administrator});
        });
    });

//routes to fetch a specific administrator. This can then be retreived, updated or deleted

router.route('/:administrator_id')

    .get(function (request, response) {
        Administrator.Model.findById(request.params.administrator_id, function (error, administrator) {
            if (error) {
               response.send({error: error});
            }
            else {
               response.json({administrator: administrator});
            }
        });
    })

    .put(function (request, response) {
        Administrator.Model.findById(request.params.administrator_id, function (error, administrator) {
            if (error) {
                response.send({error: error});
            }
            else {
                
                //save updated information of administrator
                administrator.ID = request.body.ID;
                administrator.familyName = request.body.familyName;
                administrator.givenName = request.body.givenName;
                administrator.email = request.body.email;
                administrator.dateHired = request.body.dateHired;
                administrator.dateFinished = request.body.dateFinished;
                administrator.account = request.body.account;
                administrator.forms = request.body.forms;
                
               

                administrator.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({administrator: administrator});
                    }
                });
            }
        });
    })

    .delete(function (request, response) {
        Administrator.Model.findByIdAndRemove(request.params.administrator_id,
            function (error, deleted) {
                if (!error) {
                    response.json({administrator: deleted});
                }
            }
        );
    });

module.exports = router;