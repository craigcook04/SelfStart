var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");
var ResetEmail = require('../models/resetEmail');
var UserAccount = require('../models/userAccount');
var Patient = require('../models/patient');
// var Session = require('../models/session');

// router.use(function(req, res, next){
//   // do logging
//   Session.findOne(req.params.token, function(err, session) {
//       if(err) {
//           res.send(err);
//           return;
//       }
//       if(session == null) {
//         res.status(401).send({error: "Unauthorized to access this content"});
//         return;
//       }
//       else{
//           //the user has a valid session token
//           next();
//       }
//   });
// });

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "loopsolutionsuwo@gmail.com",
        pass: "Selfstart"
    } 
});

function makeHash() {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}


router.route('/')
    .post(function(request, response) {
        console.log('hello');
        var mailOptions = {
            to: request.body.email,
            subject: request.body.subject,
            html: request.body.emailContent
        };
        
        smtpTransport.sendMail(mailOptions, function(error, resp) {
            if(error) {
                console.log(error);
                return;
            }
            console.log(resp);
            response.send({success: true, message: "Sent Mail!"});
        });
    });
    
router.route('/forgotten')
    .post(function(request, response) {
       UserAccount.findOne({userAccountName: request.body.username}, function(err, useraccount) {
           if(err){
               response.send(err);
               return;
           }
           
           console.log(useraccount);
           if(useraccount == {} || useraccount == null) {
               console.log('bad guy');
               response.send({success: false, message: "username doesn't exist"});
               return;
           }
           
           if(useraccount.changePass == true) {
               response.send({success: false, message: "password request already issued"});
               return;
           }
           
           Patient.findOne({account: useraccount._id}, function(err, myPatient) {
               if(err) {
                   response.send('bad');
                   return;
               }
               
               console.log(myPatient);
               if(myPatient == {} || myPatient == null) {
                   console.log('something bad happened');
                   return;
               }
                              
              var resetEmail = new ResetEmail();
              resetEmail.username = request.body.username;
              var randomHash = makeHash();
              resetEmail.myHash = randomHash;
              resetEmail.myDate = new Date();
              resetEmail.save(function(err) {
                  if(err) {
                      console.log("couldn't save");
                  }
              });
              //need to generate a random password for the user, and set it to their account.
              var newPassword = makeHash();
              var hashedpass = useraccount.hash(newPassword);
              var PassAndSalt = hashedpass + useraccount.salt;
              var hashedSaltPlusPass = useraccount.hash(PassAndSalt);
              var inputPassEncrypted = useraccount.encrypt(hashedSaltPlusPass);
              useraccount.encryptedPassword = inputPassEncrypted;
              useraccount.save(function(err) {
                  if(err) {
                      response.send(err);
                      return;
                  }
              });

              var emailBody = `
              <h4>Hello, please click the link below to reset your password </h4>
              <p>Your temporary password is ${newPassword} </p>
              <p>Please use this new password to log in to your account</p> 
              <p>Upon logging in, you will be prompted to enter a new password. Once you have entered your new password, your account will be updated accordingly</p>
              <h5>Thank you for using Self Start </h5>
              `;
              var mailOptions = {
                  to: myPatient.email,
                  subject: "Self Start - Recover Account",
                  html: emailBody
              }; 
               
              smtpTransport.sendMail(mailOptions, function(error, resp) {
                if(error) {
                    console.log(error);
                    return;
                }
                console.log(resp);
                response.send({success: true, message: "Sent Mail!"});
              });
           });

           
           });
       
    });
    
module.exports = router;

