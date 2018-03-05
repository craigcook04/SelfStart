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
        temp.save(function(err) {
            if(err){
                response.send({error: "error creating temp account"});
            }
        });
        
        var fullName = request.body.firstName + " " + request.body.lastName;
        var url = 'https://se3350finalproject-sammallabone.c9users.io:8082/api/temp/' + userAccessCode;
        //var emailBody = "<h1>Please click this link to verify your account </h1> <p> " + url + "</p>";
        var emailBody = `
        <body style="background: whitesmoke; text-align: center">
            <h1 style="color: #0275d8; font-family: Helvetica, Arial;">Welcome to Self Start! </h1>
            <h4>Hello ${fullName} let us be the first to welcome you to Self Start. <br> We are happy that we can help with your treatment</h4>
            <h4>Thank you for registering for Self Start! <br> <br>You are just one click away from being able to use the site and getting started </h4>
            <h4> Please <a href="${url}" >click here</a> to verify your account! </h4>
              <img src="http://marcottephysio.com/wp-content/uploads/2017/03/water-buterfly_940x434.jpg" style="margin: 1rem;">
        </body>
        `;
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
    })
    .get(function(request, response) {
        Temp.find(function(err, temps) {
            if(err){
                response.send(err);
                return;
            }
            
            response.send(temps);
        });
    });
    
router.route('/:accessCode')
    .get(function(request, response) {
        console.log(request.params.accessCode);
        Temp.findOne({'accessCode': request.params.accessCode}, function(err, temp) {
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
                
                //save the user
                user.save(function(err){
                    if(err){
                        response.send({message: "couldn't save user"});
                    }
                });
                
                //delete the temp from the database
                Temp.findByIdAndRemove(temp._id, function(err, deleted) {
                    if(err){
                        console.log("problem");
                        response.send(err);
                        return;
                    }
                    
                });
                
                
                response.send('<h1>Congrats you are verified</h1>');
            });
        });
        
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
                });
    });
    
module.exports = router;