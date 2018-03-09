var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");
var ResetEmail = require('../models/resetEmail');
var UserAccount = require('../models/userAccount');
var Patient = require('../models/patient');

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

  for (var i = 0; i < 25; i++)
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
               
              var url = 'http://localhost:8080/login/recover/' + randomHash;
               
              var emailBody = `
              <h4>Hello, please click the link below to reset your password </h4>
              <p><a href="${url}">Click here to recover your account</a> </p>
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

