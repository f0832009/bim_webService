
/**
 * Module dependencies.
 */
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var mongo_config = require('./config/mongo-config');
var dbConnector = require('./webService/dbConnector');
var spacesAPI = require('./webService/spacesAPI');
var env = process.env.NODE_ENV || 'development';

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
