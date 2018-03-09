
var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");
var ResetEmail = require('./models/resetEmail');

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
       var resetEmail = new ResetEmail();
       resetEmail.username = request.body.username;
       var randomHash = makeHash();
       resetEmail.myHash = randomHash;
       resetEmail.myDate = new Date();
       var emailBody = `
       <h4>Hello, please click the link below to reset your password </h4>
       <p><a href="localhost:8080/"
       `
       var mailOptions = {
           
       } 
    });
    
module.exports = router;

