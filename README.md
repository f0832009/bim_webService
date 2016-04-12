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

it require mongodb running instance, mongodb connection config can be edited in config folder.

defalut config:
```js
  user: '',
  pass: '',
  dbhost: 'localhost',
  port: 27017,
  db:   'mydb',
  host: '/node/mongo',
  models: '/models' 
 ```  

RESTful API:

    POST /resources
-   Post data to Spaces in JSON.

post data example:

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
    GET api/v1/originJsonData
    
-   Get original tree structure data
    
    GET api/v1/spaces
    
-   Get all data from spaces colection.

    GET api/v1/spaces/roots
    
-   Get roots node from spaces colection.

    GET api/v1/spaces/:nodeId
    
    parameter nodeId:mongodb objectId(12-byte hexadecimal value)

-   Get any node in spaces collection by id field

example:
    GET api/v1/spaces/56f28e13877f2d2080000002
    
response data example:

```json
{
    "id": "56f28e13877f2d2080000002",
    "parent": "56f28e13877f2d2080000001",
    "text": "1F"
}
```    
    GET api/v1/spaces/childTypes
    
-   Return all childType value in spaces collection

response data example:
```json
[
    "Levels",
    "Layers"
]
``` 
    
    GET api/v1/spaces/children?childType={childTypeName}
    
    query parameter childTypeName:string
    
-   Return specify node by childTypeName

example:
    GET api/v1/spaces/children?childType=Levels

response data example:

```json
{
    "id": "56f28e13877f2d2080000002",
    "parent": "56f28e13877f2d2080000001",
    "text": "1F"
}
```  
    

    DELETE /resources
    
-   Remove all data.


## Written by

-Kevin Ger

