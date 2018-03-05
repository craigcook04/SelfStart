//PHYSIOTHERAPIST ROUTE HANDLING
//========================================================

var express = require('express');
var router = express.Router();
var Physiotherapist = require('../models/physiotherapist');
var UserAccount = require('../models/userAccount');


router.route('/')

    .post(function (request, response) {
        var physiotherapist = new Physiotherapist();
        physiotherapist.ID = request.body.ID;
        physiotherapist.familyName = request.body.familyName;
        physiotherapist.givenName = request.body.givenName;
        physiotherapist.email = request.body.email;
        var myDate = new Date(request.body.dateHired);
        physiotherapist.dateHired = myDate;
        var myDate1 = new Date(request.body.dateFinished);
        physiotherapist.dateFinished = myDate1;
        physiotherapist.account = request.body.account;
        physiotherapist.treatments = request.body.treatments;
        
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
            physiotherapist.account = userAccount._id;
        
            physiotherapist.save(function (error) {
                if (error) {
                    response.send(error);
                }
            
                response.json({physiotherapist: physiotherapist});
            });
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
                console.log(request.body);
                
                //save updated information of the physiotherapist
                physiotherapist.ID = request.body.ID;
                physiotherapist.familyName = request.body.familyName;
                physiotherapist.givenName = request.body.givenName;
                physiotherapist.email = request.body.email;
                var myDate = new Date(request.body.dateHired);
                physiotherapist.dateHired = myDate;
                var myDate1 = new Date(request.body.dateFinished);
                physiotherapist.dateFinished = myDate1;
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