//USER ACCOUNT ROUTE HANDLING
//========================================================

var express = require('express');
var router = express.Router();
var UserAccount = require('../models/userAccount');
var ResetEmail = require('../models/resetEmail');
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
    

//route for changing the user's password    
router.route('/account/change')
    .put(function(request, response) {
        ResetEmail.findOne({'myHash': request.body.myHash}, function(err, validUser) {
            if(err) {
                response.send(err);
                return;
            }
            
            if(validUser == {} || validUser == null) {
                console.log('bad');
                response.send("Invalid reset code");
                return;
            }
            
            UserAccount.findOne({userAccountName: validUser.username}, function(err, useraccount) {
                if(err) {
                    response.send(err);
                    return;
                }
                
                if(useraccount == {} || useraccount == null) {
                    response.send("couldn't find the account");
                    return;
                }
                
                ResetEmail.findByIdAndRemove(validUser._id, function(err, deleted) {
                    if(err) {
                        response.send(err);
                        return;
                    }
                    
                    console.log(deleted);
                })
                
                useraccount.encryptedPassword = useraccount.generateHash(request.body.newpassword);
                useraccount.save(function(err) {
                    if(err) {
                        response.send(err);
                        return;
                    }
                    
                    response.send({success: true, message: "Password successfully updated"});
                })
                
            })
        })
    })

module.exports = router;