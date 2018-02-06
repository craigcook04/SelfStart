//RECOMMENDATION ROUTE HANDLING
//========================================================

var express = require('express');
var router = express.Router();
var Recommendation = require('../models/recommendation');

router.route('/')

    .post(function (request, response) {
        var recommendation = new Recommendation.Model(request.body.recommendation);
        recommendation.save(function (error) {
            if (error) {
                response.send(error);
            }
            
            response.json({recommendation: recommendation});
        });
    })

    .get(function (request, response) {
        Recommendation.Model.find(function (error, recommendation) {
            if (error) {
                response.send(error);
            }
            
            response.json({recommendation: recommendation});
        });
    });

//fetching a specific recommendation. The options are to retrieve the recommendation, update the recommendation or delete the recommendation

router.route('/:recommendation_id')

    .get(function (request, response) {
        Recommendation.Model.findById(request.params.recommendation_id, function (error, recommendation) {
            if (error) {
               response.send({error: error});
            }
            else {
               response.json({recommendation: recommendation});
            }
        });
    })

    .put(function (request, response) {
        Recommendation.Model.findById(request.params.recommendation_id, function (error, recommendation) {
            if (error) {
                response.send({error: error});
            }
            else {
                
                //save updated information of recommendation
                recommendation.timeStamp = request.body.timeStamp;
                recommendation.decision = request.body.decision;
                recommendation.test = request.body.test;
                recommendation.response = request.body.response;

                recommendation.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({recommendation: recommendation});
                    }
                });
            }
        });
    })

    .delete(function (request, response) {
        Recommendation.Model.findByIdAndRemove(request.params.recommendation_id,
            function (error, deleted) {
                if (!error) {
                    response.json({recommendation: deleted});
                }
            }
        );
    });

module.exports = router;