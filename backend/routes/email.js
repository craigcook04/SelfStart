
var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "loopsolutionsuwo@gmail.com",
        pass: "Selfstart"
    } 
});


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
       var emailBody = `
       <h4>Hello, please click the link below to reset your password </h4>
       <p><a href="localhost:8080/forgottenpassword"
       `
       var mailOptions = {
           
       } 
    });
    
module.exports = router;

