
/**
 * Module dependencies.
 */
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var mongo_config = rootRequire('config/mongo-config');
var dbConnector = rootRequire('routes/dbConnector');
var spacesAPI = require('./spacesAPI');
var env = process.env.NODE_ENV || 'development';
// var categoryAPI = require('./routes/categoryAPI');
// var featuresAPI = require('./routes/featuresAPI');
// var facilitiesAPI = require('./routes/facilitiesAPI');
// var STRColumnAPI = require('./routes/STRColumnAPI');

var webServiceApp = express();

var version = 'v1';
var mainRoute = '/api';
var prefix = version + mainRoute;

if (env !== 'test') webServiceApp.use(logger('dev'));
webServiceApp.use(bodyParser.json({limit: '50mb'}));
webServiceApp.use(bodyParser.urlencoded({ extended: false }));
webServiceApp.use(expressValidator());
webServiceApp.use(cookieParser());    

webServiceApp.use(prefix + '/Spaces', spacesAPI());

module.exports = webServiceApp;
