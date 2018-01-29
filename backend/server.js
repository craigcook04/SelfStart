
// DATABASE SETUP
// =============================================================================
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var cors = require('cors');

var exercises = require('./routes/exercises');
var forms = require('./routes/forms');
var patients = require('./routes/patients');
var rehabPlans = require('./routes/rehabPlans');
var appointment = require('./routes/appointment');
var assessmentTest = require('./routes/assessmentTest');


//middleware for developement only --be sure to delete before release
app.use(function (request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header('Access-Control-Allow-Methods', 'POST, PATCH, GET, PUT, DELETE, OPTIONS');
    next();
});


// configure app to use bodyParser()
// this will let us get the data from a POST
// the following 2 middleware convert the URL req and res to json format
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));


//Linking all the routes to the file defining the end points
app.use('/exercises', exercises);
app.use('/forms', forms );
app.use('/patients', patients);
app.use('/rehabPlans', rehabPlans);
app.use('/appointment', appointment);
app.use('/assessmentTest', assessmentTest);

var port = 8082;        // set our port
// DATABASE SETUP
// =============================================================================

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/startUp');


// ROUTES
// ======================================
var router = express.Router();


router.use(function(req, res, next){
   // do logging
   console.log("I'm the middle man");
   next();
});

app.use(cors());

router.get('/', function(req, res) {
    console.log("I'm the standard GET");
    res.json({ message: 'hooray! welcome to our api!' });   
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


//placeholder route --should be in different file
router.route('/hello')
    .get(function(req, res) {
        res.send({message: "Hello I worked"});
    })
    

    
    
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);