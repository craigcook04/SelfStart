//USER ACCOUNT ROUTE HANDLING
//========================================================

var express = require('express');
var router = express.Router();
var UserAccount = require('../models/userAccount');

router.route('/')

    .post(function (request, response) {
        var userAccount = new UserAccount();
        userAccount.userAccountName = request.body.userAccountName;
        userAccount.encryptedPassword = request.body.encryptedPassword;
        userAccount.adminUser = request.body.adminUser;
        userAccount.physioUser = request.body.physioUser;
        userAccount.patientUser = request.body.patientUser;
        
        userAccount.save(function (error) {
            if (error) {
                response.send(error);
            }
            
            response.json({userAccount: userAccount});
        });
    })

    .get(function (request, response) {
        UserAccount.find(function (error, userAccount) {
            if (error) {
                response.send(error);
            }
            
            response.json({userAccount: userAccount});
        });
    });

//fetching a specific user account. The options are to retrieve the user account, update the user account or delete the user account

router.route('/:userAccount_id')

    .get(function (request, response) {
        UserAccount.findById(request.params.gender_id, function (error, userAccount) {
            if (error) {
               response.send({error: error});
            }
            else {
               response.json({userAccount: userAccount});
            }
        });
    })

    .put(function (request, response) {
        UserAccount.findById(request.params.userAccount_id, function (error, userAccount) {
            if (error) {
                response.send({error: error});
            }
            else {
                
                //save updated information of user account
                userAccount.userAccountName = request.body.userAccountName;
                userAccount.encryptedPassword = request.body.encryptedPassword;
                userAccount.adminUser = request.body.adminUser;
                userAccount.physioUser = request.body.physioUser;
                userAccount.patientUser = request.body.patientUser;

                userAccount.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({userAccount: userAccount});
                    }
                });
            }
        });
    })

    .delete(function (request, response) {
        UserAccount.findByIdAndRemove(request.params.userAccount_id,
            function (error, deleted) {
                if (!error) {
                    response.json({userAccount: deleted});
                }
            }
        );
    });

module.exports = router;