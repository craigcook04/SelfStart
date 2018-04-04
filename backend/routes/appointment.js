//APPOINTMENT ROUTE HANDLING
//========================================================

var express = require('express');
var router = express.Router();
var Appointment = require('../models/appointment');
var moment = require('moment');
moment().format();
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

router.route('/')

    .post(function (request, response) {
        var appointment = new Appointment();
        appointment.date = moment(request.body.date).toISOString();
        appointment.reason = request.body.reason;
        appointment.other = request.body.other;
        appointment.userID = request.body.patient;
        appointment.type = request.body.type;
        
        appointment.save(function (error) {
            if (error) {
                response.send(error);
            }
            
            response.json({appointment: appointment});
        });
    })

    .get(function (request, response) {
        Appointment.find(function (error, appointment) {
            if (error) {
                response.send(error);
            }
            
            response.json({appointment: appointment});
        });
    })
    
     //deletes all appointments
    .delete(function(request, response){
        Appointment.deleteMany({"type": {$ne: "hello"}}, 
            function (error, deleted) {
                if (!error) {
                    response.json({appointment: deleted});
                }
            })
    })

//fetching a specific appointment. The options are to retrieve the appointment, update the appointment or delete the appointment

router.route('/:appointment_id')

    .get(function (request, response) {
        Appointment.findById(request.params.appointment_id, function (error, appointment) {
            if (error) {
               response.send({error: error});
            }
            else {
               response.json({appointment: appointment});
            }
        });
    })

    .put(function (request, response) {
        Appointment.findById(request.params.appointment_id, function (error, appointment) {
            if (error) {
                response.send({error: error});
            }
            else {
                
                //save updated information of appointment
                appointment.date = request.body.date;
                appointment.reason = request.body.reason;
                appointment.other = request.body.other;
                appointment.userID = request.body.patient;

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
        Appointment.findByIdAndRemove(request.params.appointment_id,
            function (error, deleted) {
                if (!error) {
                    response.json({appointment: deleted});
                }
            }
        );
    });
    

router.route('/client/appointments/:id')
    .get(function(request, response) {
        Appointment.find({'userID': request.params.id}, function(err, appointments) {
            if(err) {
                response.send(err);
                return;
            }
            
            if(appointments.length == 0) {
                response.send({success: false, message: 'no appointments for this user'});
                return;
            }
            
            response.send({success: true, appointments: appointments});
        });
    });
    
router.route('/:current_date')

    .get(function (request, response) {
        
        Appointment.find({$and: [{"date": {$gte: moment(request.params.current_day).startOf('day').toDate()}}, 
        {"date": {$lte: moment(request.params.current_day).endOf('day').toDate()}}]}
            ,function (error, appointment) {
            if (error) {
               response.send({error: error});
            }
            else {
               response.json({appointment: appointment});
            }
        });
    });

//example from mongodb website for reference
//db.inventory.find( { $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } )

router.route('/week/:current_week')

    .get(function (request, response) {
        console.log(request.params.current_week);
        Appointment.find({$and: [{"date": {$gte: moment(request.params.current_week, 'YYYY-MM-DDTHH:mm:ss.SSSSZ').startOf('week').toDate()}}, 
        {"date": {$lte: moment(request.params.current_week, 'YYYY-MM-DDTHH:mm:ss.SSSSZ').endOf('week').toDate()}}]}, function (error, appointment) {
            if (error) {
               response.send({error: error});
            }
            else {
               response.json({appointment: appointment});
            }
        });
    });
    
router.route('/month/:current_month')

    .get(function (request, response) {
        
        Appointment.find({$and: [{"date": {$gte: moment(request.params.current_month, 'YYYY-MM-DDTHH:mm:ss.SSSSZ').startOf('month')}}, 
        {"date": {$lte: moment(request.params.current_month, 'YYYY-MM-DDTHH:mm:ss.SSSSZ').endOf('month')}}]}, function (error, appointment) {
            if (error) {
               response.send({error: error});
            }
            else {
               response.json({appointment: appointment});
            }
        });
    });
    
router.route('/timeoff')
    .post(function (request, response) {
        var appointment = new Appointment();
        appointment.date = request.body.date;
        appointment.reason = request.body.reason;
        appointment.type = "timeoff";
        
        appointment.save(function (error) {
            if (error) {
                response.send(error);
            }
            
            response.json({appointment: appointment});
        });
    });
    
    
module.exports = router;