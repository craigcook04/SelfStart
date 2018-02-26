// ===============================
// THIS ROUTE IS FOR VERIFYING USERS

var express = require('express');
var router = express.Router();
var Temp = require('../models/temp');
var Patient = require('../models/patient');
var nodemailer = require('nodemailer');

function makeAccessCode() {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 25; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "loopsolutionsuwo@gmail.com",
        pass: "Selfstart"
    } 
});

router.route('/')
    .post(function(request, response) {
        var temp = new Temp();
        temp.userID = request.body.userID;
        temp.dateCreated = new Date();
        var userAccessCode = makeAccessCode();
        temp.accessCode = userAccessCode;
        var url = 'https://se3350finalproject-sammallabone.c9users.io:8082/api/temp/' + userAccessCode;
        var emailBody = "<h1>Hey Bro Click This </h1> <p> " + url + "</p>";
        var mailOptions = {
            to: request.body.email,
            subject: 'Please Verify Your Email For SelfStart',
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
    
router.route('/:accessCode')
    .get(function(request, response) {
        Temp.find({accessCode: request.params.accessCode}, function(err, temp) {
            if(err){
                response.send('<h2>Sorry we could not verify your account</h2>');
                return;
            }
            if(temp == null){
                response.send('<h2>Account already activated </h2>');
                return;
            }
            //now that the temp has been found, find the user that belongs to the temp
            Patient.findById(temp.userID, function(err, user) {
                if(err){
                    response.send("<h2>Sorry we could not verify your account</h2>");
                    return;
                }
                if(user == null){
                    response.send("<h2>Sorry we could not verify your account</h2>");
                    return;
                }
                
                //set the user to verified
                user.verified = true;
                
                //delete the temp from the database
                Temp.findByIdAndRemove(temp._id, function(err, deleted) {
                    if(err){
                        console.log("problem");
                        response.send(err);
                        return;
                    }
                    
                    response.send({message: "Deleted"});
                })
                
                
                response.send('<h1>Congrats you are verified</h1>');
            })
        })
        
    })
    .delete(function(request, response) {
        //delete the temp from the database
                Temp.findByIdAndRemove(request.body.temp_id, function(err, deleted) {
                    if(err){
                        console.log("problem");
                        response.send(err);
                        return;
                    }
                    
                    response.send({message: "Deleted"});
                })
    })
    
module.exports = router;