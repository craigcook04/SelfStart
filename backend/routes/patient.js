
//patient route handling

var express = require('express');
var router = express.Router();
var Patient = require('../models/patient');

//generic route for fetching all patients

router.route('/')

    .post(function (request, response) {
        var patient = new Patient();
        patient.ID = request.body.ID;
        patient.familyName = request.body.familyName;
        patient.givenName = request.body.givenName;
        patient.email = request.body.email;
        var myDate = new Date(request.body.DOB);
        patient.DOB = myDate;
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
                response.send(error);
            }
            
            response.json({patient: patient});
        });
    })

    .get(function (request, response) {
        Patient.find(function (error, patients) {
            if (error) {
                response.send(error);
            }
            
            response.json({patients: patients});
            
        }).sort({familyName: 1, givenName: 1});
    });

//fetching a specific patient

router.route('/:patient_id')

    .get(function (request, response) {
        Patient.findById(request.params.patient_id, function (error, patient) {
            if (error) {
               response.send({error: error});
            }
            else {
               response.json({patient: patient});
            }
        });
    })

    .put(function (request, response) {
        Patient.findById(request.params.patient_id, function (error, patient) {
            if (error) {
                response.send({error: error});
            }
            else {

                //save updated information of patient
                patient.ID = request.body.ID;
                patient.familyName = request.body.familyName;
                patient.givenName = request.body.givenName;
                patient.email = request.body.email;
                var myDate = new Date(request.body.DOB);
                patient.DOB = myDate;
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

                console.log(request.body);
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
        Patient.findByIdAndRemove(request.params.patient_id,
            function (error, deleted) {
                if (!error) {
                    response.json({patient: deleted});
                }
            }
        );
    });
    
//search for a specific patient
router.route('/findpatient/search')
    .get(function(request, response) {
        console.log(request.query.q);
        Patient.find({"givenName": new RegExp(request.params.q)}, function(err, patients) {
            if(err) {
                response.send(err);
                return;
            }
            console.log(patients);
            response.json({patients: patients});
        }).sort({familyName: 1, givenName: 1});
    });

module.exports = router;