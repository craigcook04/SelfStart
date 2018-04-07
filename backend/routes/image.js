 var express = require('express');
var router = express.Router();
var Image = require('../models/image');
var fs  = require('fs');
var multer = require('multer');


router.route('/')

    .post( multer().single('file'),function (request, response) {
        var image = new Image();
        
        image.name = request.file.originalname;
        image.type = request.file.originalname.split('.').pop();
        var imgData = request.file.buffer.toString("base64");
        image.data = imgData;
        image.size = request.file.size;

        
        image.save(function (error) {
            if (error) {
                response.send(error);
                return;
            }
            
            response.json({image: image});
        });
    })

    .get(function (request, response) {
        Image.find(function (error, exercises) {
            if (error) { 
                response.send(error);
                return;
            }
            response.json({exercise: exercises});
        });
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
                return;
            }
            else{
                image.update({exercise: request.body._id}, function(error, place){
                    if(error){
                        response.send({error: error});
                        return;
                    }
                    
                });
                
            }
        });
    });
    
router.route('/:image_id')

    .delete(function (request, response){
        Image.findByIdAndRemove(request.params.image_id, function (error){
            if(error) {
                response.send({error: error});
                return;
            }
            response.json("Images Removed");
        })
    });
    
router.route('/appointment/:id')

    .put(function(request, response){
        Image.findOne({name: request.body.image}, {lean: true}, function(error, image){
            if(error){
                response.send({error: "Fucker"});
                return;
            }
            
            image.appointment = request.params.id;
            image.save(function(err){
                if(err){
                    response.send({message: "Couldn't save"});
                    return;
                }
                
                response.send({success: true});
                })
            })
    });



module.exports = router;