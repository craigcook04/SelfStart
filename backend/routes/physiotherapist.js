//PHYSIOTHERAPIST ROUTE HANDLING
//========================================================

var express = require('express');
var router = express.Router();
var Physiotherapist = require('../models/physiotherapist');

router.route('/')

    .post(function (request, response) {
        var physiotherapist = new Physiotherapist();
        physiotherapist.ID = request.body.ID;
        physiotherapist.familyName = request.body.familyName;
        physiotherapist.givenName = request.body.givenName;
        physiotherapist.email = request.body.email;
        physiotherapist.dateHired = request.body.dateHired;
        physiotherapist.dateFinished = request.body.dateFinished;
        physiotherapist.account = request.body.account;
        physiotherapist.treatments = request.body.treatments;
        
        physiotherapist.save(function (error) {
            if (error) {
                response.send(error);
            }
            
            response.json({physiotherapist: physiotherapist});
        });
    })

    .get(function (request, response) {
        Physiotherapist.find(function (error, physiotherapist) {
            if (error) {
                response.send(error);
            }
            
            response.json({physiotherapist: physiotherapist});
        });
    });

//fetching a specific physiotherapist. The options are to retrieve the physiotherapist, update the physiotherapist or delete the physiotherapist

router.route('/:physiotherapist_id')

    .get(function (request, response) {
        Physiotherapist.findById(request.params.physiotherapist_id, function (error, physiotherapist) {
            if (error) {
               response.send({error: error});
            }
            else {
               response.json({physiotherapist: physiotherapist});
            }
        });
    })

    .put(function (request, response) {
        Physiotherapist.findById(request.params.physiotherapist_id, function (error, physiotherapist) {
            if (error) {
                response.send({error: error});
            }
            else {
                
                //save updated information of the physiotherapist
                physiotherapist.ID = request.body.ID;
                physiotherapist.familyName = request.body.familyName;
                physiotherapist.givenName = request.body.givenName;
                physiotherapist.email = request.body.email;
                physiotherapist.dateHired = request.body.dateHired;
                physiotherapist.dateFinished = request.body.dateFinished;
                physiotherapist.account = request.body.account;
                physiotherapist.treatments = request.body.treatments;

                physiotherapist.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({physiotherapist: physiotherapist});
                    }
                });
            }
        });
    })

    .delete(function (request, response) {
        Physiotherapist.findByIdAndRemove(request.params.physiotherapist_id,
            function (error, deleted) {
                if (!error) {
                    response.json({physiotherapist: deleted});
                }
            }
        );
    });

module.exports = router;