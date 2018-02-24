
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
            response.send({message: "Sent Mail!"});
        });
    });
    
module.exports = router;

