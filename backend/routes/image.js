var express = require('express');
var router = express.Router();
var Image = require('../models/image');
var fs  = require('fs');
var FileReader = require('filereader');


router.route('/')

    .post(function (request, response) {
        console.log("Start");
        var image = new Image();

        
        console.log("Read");
        
        image.img.data = request.body;
        image.img.contentType = 'image/png';
        
        image.save(function (error) {
            if (error) {
                response.send(error);
            }
            
            console.log("Saved");
            response.json({image: image});
        });
    })

    // .get(function (request, response) {
    //     Image.find(function (error, exercises) {
    //         if (error) response.send(error);
    //         response.json({exercise: exercises});
    //     }).sort({name: 1});
    // });

//fetching a specific exercise


module.exports = router;