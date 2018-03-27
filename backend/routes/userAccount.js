//USER ACCOUNT ROUTE HANDLING
//========================================================

var express = require('express');
var router = express.Router();
var UserAccount = require('../models/userAccount');
var Session  = require('../models/session');
const crypto = require('crypto');

router.route('/')

    .post(function (request, response) {
        var userAccount = new UserAccount();
        userAccount.userAccountName = request.body.userAccountName;
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
            UserAccount.findById(request.body.userID, function(err, useraccount) {
                if(err) {
                    response.send(err);
                    return;
                }
                
                if(useraccount == {} || useraccount == null) {
                    response.send("couldn't find the account");
                    return;
                }
                
                console.log(useraccount.encryptedPassword);
                var hashedpass = useraccount.hash(request.body.temppassword);
                var PassAndSalt = hashedpass + useraccount.salt;
                var hashedSaltPlusPass = useraccount.hash(PassAndSalt);
                var inputPassEncrypted = useraccount.encrypt(hashedSaltPlusPass);
                var inputPassDecrypted = useraccount.decrypt(inputPassEncrypted);
                var hashedPassword = useraccount.decrypt(useraccount.encryptedPassword);
                console.log(inputPassDecrypted, hashedPassword);
                if(inputPassDecrypted == hashedPassword) {
                    console.log('hello');
                    var newPassHash = useraccount.hash(request.body.password);
                    var newPashAndSalt = newPassHash + useraccount.salt;
                    var newhashedSaltPlusPass = useraccount.hash(newPashAndSalt);
                    var newinputPassEncrypted = useraccount.encrypt(newhashedSaltPlusPass);
                    useraccount.encryptedPassword = newinputPassEncrypted;
                    useraccount.needToChangePass = false;
                }
                
                else{
                    response.send({success: false, message: "Temporary password is not correct"});
                    return;
                }
                
                useraccount.save(function(err) {
                    if(err) {
                        response.send(err);
                        return;
                    }
                    console.log(2, " -----", useraccount.encryptedPassword);
                    
                    response.send({success: true, message: "Password successfully updated", username: useraccount.userAccountName});
                });
                
            });
    });

router.route('/account/reset')
    .put(function(request, response) {
        UserAccount.findOne({'userAccountName': request.body.username}, function(err, user) {
            if(err) {
                response.send(err);
                return;
            }
            
            if(user == {} || user == null) {
                //no account exists with that user name:
                response.send({success: false, message: "No account exists with this as a username"});
                return;
                
            }
            console.log('hello');
            user.needToChangePass = true;
            user.save(function(err) {
                if(err) {
                    response.send(err);
                    return;
                }
                console.log(user);
                response.send({success: true, message: "A reset request has been sent to the admin"});
            });
        });
    })
    .get(function(request, response) {
        //get all accounts requesting to have their account reset
        UserAccount.find({'needToChangePass': true}, function(err, users) {
            if(err) {
                response.send(err);
                return;
            }
            
            response.send(users);
        });
    });
    
router.route('/account/login')
    .post(function(request, response) {
       UserAccount.findOne({'userAccountName': request.body.username}, function(err, user) {
           if(err) {
               response.send(err);
               return;
           }
           
           if(user == null ){
               response.send({success: false, message: "This username doesnt exist"});
               return;
           }

           var inputPassDecrypted = user.decrypt(request.body.encryptedpass);
           var hashedPassword = user.decrypt(user.encryptedPassword);
           var sentDecryptedNonce = user.decrypt(request.body.encryptednonce);
           Session.findOne({'nonce': sentDecryptedNonce}, function(err, session) {
               if(err) {
                   response.send(err);
               }
               console.log(session);
               
               if(inputPassDecrypted == hashedPassword && session.userID == user._id) {
                  if(user.needToChangePass == true) {
                          response.send({success: true, changePass: true, message: "You need to update your password", userID: user._id, role: user.userCode});
                          return;
                   }
                   else {
                         response.send({success: true, changePass: false, message: "Congratulations you are now logged in", role: user.userCode, username: user.userAccountName, userID: user._id});
                         return;
                   }
                }
                   
                else {
                      response.send({success: false, incPass: true, message: "Password is incorrect"});
                      return;
                }
           });
       

       });
    });
    
router.route('/account/initial')
    .post(function(request, response) {
        UserAccount.findOne({'userAccountName': request.body.username}, function(err, user) {
            if(err) {
                response.send(err);
                return;
            }
            
            var nonce = crypto.randomBytes(32).toString('base64');
            console.log(nonce);
            var session = new Session();
            session.userID = user._id;
            var encryptedNonce = user.encrypt(nonce);
            session.nonce = user.decrypt(encryptedNonce);
            session.opened = new Date();
            session.userType = user.userCode;
            
            session.save(function(err) {
                if(err) {
                    response.send(err);
                    return;
                }
                
                response.send({nonce: nonce, salt: user.salt});
            });
            
        });
    });
    
router.route('/session/loggedin')
    .post(function(request, response) {
        var user = new UserAccount();
        var decryptedSessionToken = user.decrypt(request.body.sessionToken);
        Session.findOne({'nonce': decryptedSessionToken}, function(err, session) {
            if(err) {
                response.send(err);
                return;
            }
            console.log('session token and open session' , decryptedSessionToken, session);
            if(!session || session == null) {
                response.send({authorized: false});
            }
            
            else{
                response.send({authorized: true, role: session.userType});
            }
        });
    })
    .get(function(request, response) {
        Session.find(function(err, sessions) {
            if(err) {
                response.send(err);
                return;
            }
            
            response.send({sessions: sessions});
        });
    })
    .delete(function(request, response) {
        Session.remove(function(err, deleted) {
            if(err) {
                response.send(err);
                return;
            }
            
            response.send({deleted: deleted});
        })
    });

router.route('/session/logout/:id')
    .delete(function(request, response) {
        Session.findByIdAndRemove(request.route.id, function(err, deleted) {
            if(err) {
                response.send(err);
                return;
            }
            
            response.send({deleted: deleted});
        });
    });
module.exports = router;