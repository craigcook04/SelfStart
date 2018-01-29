//CITY ROUTE HANDLING
//========================================================

var express = require('express');
var router = express.Router();
var City = require('../models/city');

router.route('/')

    .post(function (request, response) {
        var city = new City.Model(request.body.city);
        city.save(function (error) {
            if (error) {
                response.send(error);
            }
            
            response.json({city: city});
        });
    })

    .get(function (request, response) {
        City.Model.find(function (error, city) {
            if (error) {
                response.send(error);
            }
            
            response.json({city: city});
        });
    });

//fetching city by id, can then retrieve this city, modify the city or delete the city
router.route('/:city_id')

    .get(function (request, response) {
        City.Model.findById(request.params.city_id, function (error, city) {
            if (error) {
               response.send({error: error});
            }
            else {
               response.json({city: city});
            }
        });
    })

    .put(function (request, response) {
        City.Model.findById(request.params.city_id, function (error, city) {
            if (error) {
                response.send({error: error});
            }
            else {
                
                //save updated information of city
                city.name = request.body.name;
                city.province = request.body.province;
                city.patient = request.body.patient;
                
                city.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({city: city});
                    }
                });
            }
        });
    })

    .delete(function (request, response) {
        City.Model.findByIdAndRemove(request.params.city_id,
            function (error, deleted) {
                if (!error) {
                    response.json({city: deleted});
                }
            }
        );
    });

module.exports = router;