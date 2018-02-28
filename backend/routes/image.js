var express = require('express');
var router = express.Router();
var Image = require('../models/image');
var fs  = require('fs');
var multer = require('multer');


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
    });
    
    
router.route('/:image_exercise')
    
    .get(function ( request, response){
        Image.findById(request.params.image_exercise, function(error, images){
            if(error){
                response.send({error: error});
            }
            else{
                response.json({images: images});
            }
        })
    })
    
router.route('/setid')

    .put(function(request, response){
        console.log(request.body.images);
        console.log(request.body._id);
        var images = Image.find({name: {$elemMatch: request.body.images}});
        console.log(images);
        
        // Image.find({name: { $elemMatch: request.body.images}}, function(error, images){
        //     console.log(images);
        //     for(var i = 0; i < images.length; i++){
        //         images[i].exercise = request.body.exercise_id;
                
        //         console.log(images[i].exercise);
                
        //         images[i].save(function (error){
        //             if(error){
        //                 response.send({error: error});
        //             }
        //             else{
        //                 console.log("I worked");
        //             }
        //         })
        //     }
        // });
        
    })
    

//fetching a specific exercise


module.exports = router;