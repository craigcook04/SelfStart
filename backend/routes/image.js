 var express = require('express');
var router = express.Router();
var Image = require('../models/image');
var fs  = require('fs');
var multer = require('multer');
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

    .post( multer().single('file'),function (request, response) {
        console.log("Start");
        var image = new Image();
        
        image.name = request.file.originalname;
        image.type = request.file.originalname.split('.').pop();
        var imgData = request.file.buffer.toString("base64");
        image.data = imgData;
        image.size = request.file.size;
        
        image.save(function (error) {
            if (error) {
                response.send(error);
            }
            
            console.log("Saved");
            response.json({image: image});
        });
    })

    .get(function (request, response) {
        Image.find(function (error, exercises) {
            if (error) response.send(error);
            response.json({exercise: exercises});
        }).sort({name: 1});
    })
    
//make delete to clear up database

    .delete(function (request, response){
        Image.find().remove().exec();
        console.log("Deleted?");
    });
    
    
router.route('/:image_exercise')
    
    .get(function ( request, response){
        Image.find({exercise: request.params.image_exercise}, function(error, images){
            if(error){
                response.send({error: error});
            }
            else{
                response.json({images: images});
            }
        });
    });
    
router.route('/setid')

    .put(function(request, response){
        
        Image.findOne({name: request.body.image}, {lean: true}, function(error, image){
            if(error){
                response.send({error: error});
            }
            else{
                
                image.update({exercise: request.body._id}, function(error, place){
                    if(error){ console.log("I didn't work")}
                    console.log("I worked");
                });
                
            }
        });
        
    });
    
router.route('/:image_id')

    .delete(function (request, response){
        Image.findByIdAndRemove(request.params.image_id, function (error){
            if(error) {response.send({error: error});}
            response.json("Images Removed");
        })
    });
    

//fetching a specific exercise


module.exports = router;