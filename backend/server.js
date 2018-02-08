
// DATABASE SETUP
// =============================================================================
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var cors = require('cors');


//linking variables to the files of the routes
var exercises = require('./routes/exercises');
var forms = require('./routes/forms');
var patients = require('./routes/patient');
var rehabPlans = require('./routes/rehabPlans');
var appointment = require('./routes/appointment');
var assessmentTest = require('./routes/assessmentTest');
var city = require('./routes/city');
var administrator = require('./routes/administrator');
var country = require('./routes/country');
var gender = require('./routes/gender');
var payments = require('./routes/payments');
var physiotherapist = require('./routes/physiotherapist');
var province = require('./routes/province');
var question = require('./routes/question');
var questionType = require('./routes/questionType');
var recommendation = require('./routes/recommendation');
var testResult = require('./routes/testResult');
var userAccount = require('./routes/userAccount');



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
app.use('/api/exercises', exercises);
app.use('/api/forms', forms );
app.use('/api/patient', patients);
app.use('/api/rehabPlans', rehabPlans);
app.use('/api/appointment', appointment);
app.use('/api/assessmentTest', assessmentTest);
app.use('/api/city', city);
app.use('/api/administrator', administrator);
app.use('/api/country', country);
app.use('/api/gender', gender);
app.use('/api/payments', payments);
app.use('/api/physiotherapist', physiotherapist);
app.use('/api/province', province);
app.use('/api/question', question);
app.use('/api/questiontype', questionType);
app.use('/api/recommendation', recommendation);
app.use('/api/testresult', testResult);
app.use('/api/useraccount', userAccount);


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
    
    
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);