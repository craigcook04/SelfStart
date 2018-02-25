// ===============================
// THIS ROUTE IS FOR VERIFYING USERS

var express = require('express');
var router = express.Router();
var Temp = require('../models/temp');

function hashCode() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

router.route('/')
    .post(function(request, response) {
        var temp = new Temp();
        temp.userID = request.body.userID;
        temp.dateCreated = new Date();
        var userAccessCode = hashCode();
        console.log(userAccessCode);
    })
    
module.exports = router;