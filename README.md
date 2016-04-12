# bim_webService

## Description

An package for BIMFM_WebService.


## install

        $ npm install view-and-data
        
        then require('bim-webservice) main function is an express app,
        
- Request your own API keys from our developer portal [developer.autodesk.com](http://developer.autodesk.com).
- Replace the credentials placeholders with your own keys in `config-view-and-data.js` or use ENV variables:

        ConsumerKey: process.env.CONSUMERKEY || '<replace with your consumer key>',
        ConsumerSecret: process.env.CONSUMERSECRET || '<replace with your consumer secret>'

- Set up the default bucket name defined by the `defaultBucketKey` variable.
- Copy the file `config-view-and-data.js` to your server config directory.

## Usage
main function is an express app, can be use by your main app, and router implement in REST

```js
var webServiceApp = require('bim-webservice);

app.use(webServiceApp);
```  
RESTful API

    GET /resources
    GET /resources/:id
    POST /resources
    PUT /resources/:id
    DELETE /resources/:id


## Written by

-Kevin Ger

