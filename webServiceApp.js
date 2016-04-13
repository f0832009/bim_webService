
/**
 * Module dependencies.
 */
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var urljoin = require('url-join');

var mongo_config = require('./config/mongo-config');
var dbConnector = require('./dbConnector');
var spacesAPI = require('./webService/spaces');
var env = process.env.NODE_ENV || 'development';

module.exports = function(dbConfig){
    var version = 'v1';
    var mainRoute = '/api';    
    
    var dbConfig = dbConfig || require('./config/mongo-config');
    var connector = new dbConnector(dbConfig);
    connector.initializeDb(function(){
        
    });    
    var webServiceApp = express();

    if (env !== 'test') webServiceApp.use(logger('dev'));
    webServiceApp.use(bodyParser.json({limit: '50mb'}));
    webServiceApp.use(bodyParser.urlencoded({ extended: false }));
    webServiceApp.use(expressValidator());
    webServiceApp.use(cookieParser());    

    webServiceApp.use(urljoin(mainRoute, version, 'spaces'), spacesAPI());
    
    return webServiceApp;
}


