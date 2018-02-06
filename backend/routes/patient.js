
//patient route handling

var express = require('express');
var router = express.Router();
var Patient = require('../models/patient');

//generic route for fetching all patients

router.route('/')

    .post(function (request, response) {
        var patient = new Patient.Model(request.body.patient);
        patient.save(function (error) {
            if (error) response.send(error);
            response.json({patient: patient});
        });
    })

    .get(function (request, response) {
        Patient.Model.find(function (error, patients) {
            if (error) response.send(error);
            //response.json({patient: patients});
            console.log("I am in");
            response.json({response: "Hello im in patient"});
        });
    });

//fetching a specific patient

router.route('/:patient_id')

    .get(function (request, response) {
        Patient.Model.findById(request.params.patient_id, function (error, patient) {
            if (error) {
               response.send({error: error});
            }
            else {
               response.json({patient: patient});
            }
        });
    })

    .put(function (request, response) {
        Patient.Model.findById(request.params.patient_id, function (error, patient) {
            if (error) {
                response.send({error: error});
            }
            else {

                //save updated information of patient
                patient.ID = request.body.patient.ID;
                patient.familyName = request.body.familyName;
                patient.givenName = request.body.givenName;
                patient.email = request.body.email;
                patient.DOB = request.body.DOB;
                patient.postalCode = request.body.postalCode;
                patient.phone = request.body.phone;
                patient.maritalStatus = request.body.maritalStatus;
                patient.healthCardNumber = request.body.healthCardNumber;
                patient.occupation = request.body.occupation;
                patient.others = request.body.others;
                patient.account = request.body.account;
                patient.payment = request.body.payment;
                patient.country = request.body.country;
                patient.province = request.body.province;
                patient.city = request.body.city;
                patient.gender = request.body.gender;
                patient.appointment = request.body.appointment;


                patient.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({patient: patient});
                    }
                });
            }
        });
    })

    .delete(function (request, response) {
        Patient.Model.findByIdAndRemove(request.params.patient_id,
            function (error, deleted) {
                if (!error) {
                    response.json({patient: deleted});
                }
            }
        );
    });

module.exports = router;