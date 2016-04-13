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
        "name": "Foundation",
        "resourcePath": "",
        "remark": "",       
        "childType": "Layers",
        "children":[{
            "name": "AR",
            "resourcePath": "",
            "remark": ""       
        },{
            "name": "STR",
            "resourcePath": "./models/NTPC/STR/Resource/3D_View/Foundation/Foundation.svf",
            "remark": ""            
        },{
            "name": "MEP",
            "resourcePath": "",
            "remark": "" 
        }]
    },{
        "name": "B3F",
        "resourcePath": "",
        "remark": "",   
        "childType": "Layers",
        "children": [{
            "name": "AR",
            "resourcePath": "./models/NTPC/AR/Resource/3D___/B3F/B3F.svf",
            "remark": ""
        },{
            "name": "STR",
            "resourcePath": "./models/NTPC/STR/Resource/3D___/B3F/B3F.svf",
            "remark": ""
        },{
            "name": "MEP",
            "resourcePath": "./models/NTPC/MEP/Resource/3D___/B3F/B3F.svf",
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
    GET api/v1/spaces/childtypes
    
-   Get all childType value in spaces collection

response data example:
```json
[
    "Levels",
    "Layers"
]
```     
    GET api/v1/spaces/nodes?childType={childTypeName}
    
    query parameter childTypeName:string
    
-   Get specify node by childTypeName

example:

    GET api/v1/spaces/nodes?childType=Levels

response data example:

```json
[{
    "id": "56f28e13877f2d2080000002",
    "parent": "56f28e13877f2d2080000001",
    "text": "1F"    
},{
    "id": "56f28e13877f2d2080000003",
    "parent": "56f28e13877f2d2080000001",
    "text": "2F"
}]
```  

    GET api/v1/spaces/:nodeId/children?name={nodeName}    
    
    query parameter nodeName(optional):string
    
example:

    GET api/v1/spaces/56f28e13877f2d2080000002/children

response data example:

```json
[{
    "id": "56f28e13877f2d2080000007",
    "parent": "56f28e13877f2d2080000002",
    "text": "AR"    
},{
    "id": "56f28e13877f2d2080000008",
    "parent": "56f28e13877f2d2080000002",
    "text": "STR"    
},{
    "id": "56f28e13877f2d2080000009",
    "parent": "56f28e13877f2d2080000002",
    "text": "MEP"    
}]
```    
    
example2:

    GET api/v1/spaces/56f28e13877f2d2080000002/children?name=STR

response data example:

```json
{
    "id": "56f28e13877f2d2080000007",
    "parent": "56f28e13877f2d2080000002",
    "text": "STR"    
}
``` 
    
    DELETE /spaces
    
-   Remove all data.


## Written by

-Kevin Ger

