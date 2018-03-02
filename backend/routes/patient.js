
//patient route handling

var express = require('express');
var router = express.Router();
var Patient = require('../models/patient');
var UserAccount = require('../models/userAccount');

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
        patient.verified = false;
        
        var userAccount = new UserAccount();
        userAccount.userAccountName = request.body.username;
        userAccount.encryptedPassword = userAccount.generateHash(request.body.password);
        console.log(userAccount.encryptedPassword);
        
        userAccount.save(function(err, userAccount) {
            if(err){
                response.send(err);
                return;
            }
            //create the user account of the patient and then sets the patient's account to it's ID, then save the patient
            patient.account = userAccount._id;
            
            patient.save(function (error) {
            if (error) {
                response.send(error);
                return;
            }
            
            response.json({success: true, patient: patient});
        });
        });
        
    })

    .get(function (request, response) {
        if(request.query.q != null || request.query.q != undefined) {
            //if the query string isn't null, set the query to search for the query string
            var search = '^' + request.query.q;
            var regexexp = new RegExp(search, 'i');
            var query = {givenName: regexexp};
        }
        else{
            query = {};
        }
        var options = 
        {
            sort: {familyName: 1},
            populate: [{path: 'account', select: 'userAccountName'}, 'country', 'city', 'province', 'gender'],
            limit: 10,
            offset: 0
        };
        
        Patient.paginate(query, options, function(err, results) {
            if(err) {
                console.log(err);
                response.send(err);
                return;
            }
            
            response.send(results);
        });
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
                        response.json({success: true, patient: patient});
                    }
                });
            }
        });
    })

    .delete(function (request, response) {
        Patient.findByIdAndRemove(request.params.patient_id,
            function (error, deleted) {
                if(error) {
                    console.log(error);
                    response.send(error);
                    return;
                }
                response.json({success: true, patient: deleted});
                
            }
        );
    });
    
//search for a specific patient
router.route('/findpatient/search')
    .get(function(request, response) {
        
        Patient.find({"familyName": request.query.q})
        .sort({familyName: 1, givenName: 1})
        .populate('province').populate('city').populate('country')
        .exec(function(error, patients) {
            if (error) {
                response.send(error);
            }
            
            response.json({patients: patients});
            
        });
    });

module.exports = router;