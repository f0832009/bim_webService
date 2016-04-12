# bim_webService

## Description

An package for BIMFM_WebService.

## install

    $ npm install              

## Usage
main function is an express app, can be use by your main app, and the express route is implement in REST.

```js
var webServiceApp = require('bim-webservice');

app.use(webServiceApp);
```  
RESTful API:

    POST /resources
-   Post data to Spaces in JSON.
exsample:
```json
{
    "name": "HTPC",
    "resourcePath": "",
    "remark": "",
    "childType": "Levels",
    "children": [{
        "name": "1F",
        "resourcePath": "./data/1F",
        "remark": "",       
        "childType": "Layers",
        "children":[{
            "name": "AR",
            "resourcePath": "./data/1F/AR",
            "remark": ""       
        },{
            "name": "STR",
            "resourcePath": "./data/1F/STR",
            "remark": ""            
        }]
    },{
        "name": "2F",
        "resourcePath": "./data/2F",
        "remark": "",   
        "childType": "Layers",
        "children": [{
            "name": "AR",
            "resourcePath": "./data/2F/AR",
            "remark": ""
        },{
            "name": "MEP",
            "resourcePath": "./data/2F/MEP",
            "remark": ""
        }]    
    }]    
}
```  
    GET api/v1/spaces
-   Return all data from Spaces

    GET api/v1/spaces/childTypes

    DELETE /resources
-   Remove all data 


## Written by

-Kevin Ger

