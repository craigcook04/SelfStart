//PAYMENT ROUTE HANDLING
//========================================================

var express = require('express');
var router = express.Router();
var Payment = require('../models/payments');

router.route('/')

    .post(function (request, response) {
        var payment = new Payment();
        payment.dayTimeStamp = request.body.dayTimeStamp;
        payment.amount = request.body.amount;
        payment.note = request.body.note;
        payment.patient = request.body.patient;
        
        payment.save(function (error) {
            if (error) {
                response.send(error);
            }
            
            response.json({payment: payment});
        });
    })

    .get(function (request, response) {
        Payment.find(function (error, payment) {
            if (error) {
                response.send(error);
            }
            
            response.json({payment: payment});
        });
    });

//fetching a specific payment. The options are to retrieve the payment, update the payment or delete the payment

router.route('/:payment_id')

    .get(function (request, response) {
        Payment.findById(request.params.payment_id, function (error, payment) {
            if (error) {
               response.send({error: error});
            }
            else {
               response.json({payment: payment});
            }
        });
    })

    .put(function (request, response) {
        Payment.findById(request.params.payment_id, function (error, payment) {
            if (error) {
                response.send({error: error});
            }
            else {
                
                //save updated information of payment
                payment.dayTimeStamp = request.body.dayTimeStamp;
                payment.amount = request.body.amount;
                payment.note = request.body.note;
                payment.patient = request.body.patient;

                payment.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({payment: payment});
                    }
                });
            }
        });
    })

    .delete(function (request, response) {
        Payment.findByIdAndRemove(request.params.payment_id,
            function (error, deleted) {
                if (!error) {
                    response.json({payment: deleted});
                }
            }
        );
    });

module.exports = router;