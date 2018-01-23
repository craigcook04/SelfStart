/* 
SUMMARY:
This is a Node.js web API that is connected to by our Angular front end. This stores messages within a MongoDB database and 
uses the Indico API to submit data for Sentiment 

*/
// DATABASE SETUP
// =============================================================================
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var cors = require('cors');


//Configuration parameters for the indico.io API
var indico = require('indico.io');
indico.apiKey = '1368cfc82277b8ed42c531a1c6ae2351';

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 8082;        // set our port
// var port = 12222;
// DATABASE SETUP
// =============================================================================

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/messageboard', {
  useMongoClient: true,
});

var Message = require("./message");

// ROUTES
// ======================================
var router = express.Router();

app.use('/client', express.static('client'));

router.use(function(req, res, next){
   // do logging
   console.log("I'm the middle man");
   next();
});

app.use(cors())
router.get('/', function(req, res) {
    console.log("I'm the standard GET");
    res.json({ message: 'hooray! welcome to our api!' });   
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);