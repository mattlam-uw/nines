// Node.js Module Dependencies
var express = require('express');
var router = express.Router();
var path = require('path');

// Local Module Dependencies
var Errors = require('../nines-pinger/modules/errorIO_Mongo.js'); // Errors model
var config = require('../modules/config-convey'); // Config data

/* GET (retrieve all error data -- provided in one object) */
// NOTE: Keeping it simple for now. I may decide in the future to provide
//       separate GET requests for status codes, associated counts, and
//       associated file names. But for now, just returning the whole object
router.get('/', function(req, res, next) {
    Errors.getErrors(function(errors) {
        res.json(errors);
    });
});

/* GET status codes */
router.get('/codes', function(req, res, next) {
    Errors.getReqErrStats(config.logFileDir, function(errors) {
        var statusCodes = [];
        // iterate over errors object and add codes to array
        for (var code in errors) {
            statusCodes.push(code);
        }
        res.json(statusCodes);
   });
});

/* GET count for given status code */
router.get('/:id/count', function(req, res, next) {
    Errors.getReqErrStats(config.logFileDir, function(errors) {
        var result = [];
        result.push(errors[req.params.id].count);
        res.json(result);
    });
});

/* GET file names for given status code */
router.get('/:id/files', function(req, res, next) {
    Errors.getReqErrStats(config.logFileDir, function(errors) {
        res.json(errors[req.params.id].files);
    });
});


module.exports = router;
