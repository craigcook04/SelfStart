//PROVINCE ROUTE HANDLING
//========================================================

var express = require('express');
var router = express.Router();
var Province = require('../models/province');

router.route('/')

    .post(function (request, response) {
        var province = new Province.Model(request.body.province);
        province.save(function (error) {
            if (error) {
                response.send(error);
            }
            
            response.json({province: province});
        });
    })

    .get(function (request, response) {
        Province.Model.find(function (error, province) {
            if (error) {
                response.send(error);
            }
            
            response.json({province: province});
        });
    });

//fetching a specific province. The options are to retrieve the province, update the province or delete the province

router.route('/:province_id')

    .get(function (request, response) {
        Province.Model.findById(request.params.province_id, function (error, province) {
            if (error) {
               response.send({error: error});
            }
            else {
               response.json({province: province});
            }
        });
    })

    .put(function (request, response) {
        Province.Model.findById(request.params.province_id, function (error, province) {
            if (error) {
                response.send({error: error});
            }
            else {
                
                //save updated information of province
                province.name = request.body.name;
                province.country = request.body.country;
                province.city = request.body.city;
                province.patient = request.body.patient;

                province.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({province: province});
                    }
                });
            }
        });
    })

    .delete(function (request, response) {
        Province.Model.findByIdAndRemove(request.params.province_id,
            function (error, deleted) {
                if (!error) {
                    response.json({province: deleted});
                }
            }
        );
    });

module.exports = router;