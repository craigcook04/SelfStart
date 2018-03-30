var express = require('express');
var router = express.Router();
var Role = require('../models/role');
var Permission = require('../models/rolePermission');

router.route('/')
    .get(function(request, response) {
        
    })
    .post(function(request, response) {
        
    });
    
    
router.route('/manage/:id')
    .get(function(request, response) {
        
    })
    .put(function(request, response) {
        
    })
    .delete(function(request, response) {
        
    });
    
router.route('/permission')
    .get(function(request, response) {
        
    })
    .post(function(request, response) {
        
    });
    
router.route('/permission/:permission_id')
    .get(function(request, response) {
        
    })
    .put(function(request, response) {
        
    })
    .delete(function(request, response) {
        
    });

module.exports = router;