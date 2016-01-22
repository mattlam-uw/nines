/**
 * Urls Model
 *
 * This model provides data around URLs to be pinged
 **/

// Dependencies
var mongoose = require('mongoose');

// Define Mongoose Schema
var UrlSchema = new mongoose.Schema({
    name: String,
    host: String,
    path: String,
    protocol: String,
    response_total: Number,
    error_total: Number
});

// Export mongoose 'Urls' model, which will create/use a collection called
// 'urls' in MongoDB
module.exports = mongoose.model('Url', UrlSchema);
