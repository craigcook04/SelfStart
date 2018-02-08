//COUNTRY ROUTE HANDLING
//========================================================

var express = require('express');
var router = express.Router();
var Country = require('../models/country');

router.route('/')

    .post(function (request, response) {
         var country = new Country();
         country.name = request.body.name;
         country.province = request.body.province;
         country.patient = request.body.patient;
        
         country.save(function (error) {
            if (error) {
                response.send(error);
            }
            
            response.json({country: country});
        });
    })

    .get(function (request, response) {
        Country.find(function (error, country) {
            if (error) {
                response.send(error);
            }
            
            response.json({country: country});
        });
        
    });

//fetching a specific country. The options are to retrieve the country, update the country or delete the country

router.route('/:country_id')

    .get(function (request, response) {
        Country.findById(request.params.country_id, function (error, country) {
            if (error) {
              response.send({error: error});
            }
            else {
              response.json({country: country});
            }
        });
        
        
    })

    .put(function (request, response) {
        Country.findById(request.params.country_id, function (error, country) {
            if (error) {
                response.send({error: error});
            }
            else {
                
                //save updated information of country
                country.name = request.body.name;
                country.province = request.body.province;
                country.patient = request.body.patient;
               

                country.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({country: country});
                    }
                });
            }
        });
    })

    .delete(function (request, response) {
        Country.findByIdAndRemove(request.params.country_id,
            function (error, deleted) {
                if (!error) {
                    response.json({country: deleted});
                }
            }
        );
    });

module.exports = router;