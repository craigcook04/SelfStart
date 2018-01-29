//APPOINTMENT ROUTE HANDLING
//========================================================

var express = require('express');
var router = express.Router();
var Appointment = require('../models/appointment');

router.route('/')

    .post(function (request, response) {
        var appointment = new Appointment.Model(request.body.appointment);
        appointment.save(function (error) {
            if (error) {
                response.send(error);
            }
            
            response.json({appointment: appointment});
        });
    })

    .get(function (request, response) {
        Appointment.Model.find(function (error, appointment) {
            if (error) {
                response.send(error);
            }
            
            response.json({appointment: appointment});
        });
    });

//fetching a specific appointment. The options are to retrieve the appointment, update the appointment or delete the appointment

router.route('/:appointment_id')

    .get(function (request, response) {
        Appointment.Model.findById(request.params.appointment_id, function (error, appointment) {
            if (error) {
               response.send({error: error});
            }
            else {
               response.json({appointment: appointment});
            }
        });
    })

    .put(function (request, response) {
        Appointment.Model.findById(request.params.appointment_id, function (error, appointment) {
            if (error) {
                response.send({error: error});
            }
            else {
                
                //save updated information of appointment
                appointment.date = request.body.date;
                appointment.reason = request.body.reason;
                appointment.other = request.body.other;
                appointment.patient = request.body.patient;

                appointment.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({appointment: appointment});
                    }
                });
            }
        });
    })

    .delete(function (request, response) {
        Appointment.Model.findByIdAndRemove(request.params.appointment_id,
            function (error, deleted) {
                if (!error) {
                    response.json({appointment: deleted});
                }
            }
        );
    });

module.exports = router;