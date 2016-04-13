# bim_webService

## Description

A package for BIMFM_WebService.

## install

    $ npm install https://acount:password@bitbucket.org/bimfm-tw/bim-webservice.git

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
<<<<<<< HEAD
<<<<<<< HEAD
```  
=======
 ```  
>>>>>>> 64717de8f5122c8dc140f9036b0d1a2c430c855c
=======
 ```  
>>>>>>> 64717de8f5122c8dc140f9036b0d1a2c430c855c

RESTful API:
```
    POST api/v1/spaces
```

-   Post datas to Spaces in JSON.

post data example:

<<<<<<< HEAD
=======
    POST /resources
-   Post data to Spaces in JSON.

post data example:

<<<<<<< HEAD
>>>>>>> 64717de8f5122c8dc140f9036b0d1a2c430c855c
=======
>>>>>>> 64717de8f5122c8dc140f9036b0d1a2c430c855c
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
<<<<<<< HEAD
<<<<<<< HEAD
            "remark": ""
        },{
            "name": "STR",
            "resourcePath": "./models/NTPC/STR/Resource/3D___/B3F/B3F.svf",
=======
=======
>>>>>>> 64717de8f5122c8dc140f9036b0d1a2c430c855c
            "remark": ""
        },{
            "name": "STR",
            "resourcePath": "./models/NTPC/STR/Resource/3D___/B3F/B3F.svf",
            "remark": ""
        },{
            "name": "MEP",
            "resourcePath": "./models/NTPC/MEP/Resource/3D___/B3F/B3F.svf",
<<<<<<< HEAD
>>>>>>> 64717de8f5122c8dc140f9036b0d1a2c430c855c
=======
>>>>>>> 64717de8f5122c8dc140f9036b0d1a2c430c855c
            "remark": ""
        },{
            "name": "MEP",
            "resourcePath": "./models/NTPC/MEP/Resource/3D___/B3F/B3F.svf",
            "remark": "" 
        }]    
    }] 
}
```  
<<<<<<< HEAD
<<<<<<< HEAD
```   
    GET api/v1/spaces
```    
-   Get all data from spaces colection.
```
    GET api/v1/spaces/roots
```    
-   Get roots node from spaces colection.
```
    GET api/v1/spaces/:nodeId
    Routeparameter nodeId:mongodb objectId(12-byte hexadecimal value)
```
-   Get any node in spaces collection by id field

example:
```
    api/v1/spaces/56f28e13877f2d2080000002
```    
response data example:

```json
{
    "id": "56f28e13877f2d2080000002",
    "parent": "56f28e13877f2d2080000001",
    "text": "1F"
}
``` 
```
    GET api/v1/spaces/:nodeId/originJsonData
    Route parameter nodeId:mongodb objectId(12-byte hexadecimal value)
    this nodeId should be a rootNodeId 
```    
-   Get original tree structure data
```
```
    GET api/v1/spaces/:nodeId/children?name={nodeName}
    query parameter nodeName(optional):string
```    
example:
```
    api/v1/spaces/56f28e13877f2d2080000002/children
```
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
```
    api/v1/spaces/56f28e13877f2d2080000002/children?name=STR
```
response data example:
```json
{
    "id": "56f28e13877f2d2080000007",
    "parent": "56f28e13877f2d2080000002",
    "text": "STR"    
}
``` 
``` 
    GET api/v1/spaces/:rootNodeId/spacetypes
```    
-   Get all spaceType name in a tree

response data example:
```json
[
    "Levels",
    "Layers"
]
```     
```
    GET api/v1/spaces/nodes?spaceType={spaceTypeName}
    query parameter spaceTypeName:string
```   
-   Get specify nodes by spaceTypeName

example:
```
    api/v1/spaces/nodes?spaceType=Levels
```
=======
=======
>>>>>>> 64717de8f5122c8dc140f9036b0d1a2c430c855c
    GET api/v1/originJsonData
    
-   Get original tree structure data
    
    GET api/v1/spaces
    
-   Get all data from spaces colection.

    GET api/v1/spaces/roots
    
-   Get roots node from spaces colection.

    GET api/v1/spaces/:nodeId
    
    parameter nodeId:mongodb objectId(12-byte hexadecimal value)

-   Get any node in spaces collection by id field
<<<<<<< HEAD

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

>>>>>>> 64717de8f5122c8dc140f9036b0d1a2c430c855c
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

<<<<<<< HEAD
```    
    DELETE /spaces
```    
-   Remove all data.

## Function comparison Table

getSpaces -> 1.先Request取得Space所有根節點 ex.HTPC  api/v1/spaces/roots 

             2.再Request取得HTPC節點下一層的type是levels的節點 api/v1/spaces/{HTPC'sId}/children 
                                                                or
                                                  api/v1/spaces/nodes?spaceType=Levels 
                                                  
             3.最後合併前面2項HTPC與其子節點的Respone Json

getLayers -> 1.取得任意樓層的Layers ex.1F api/v1/spaces/{1F'sId}/children 
                                                     or
                                       api/v1/spaces/nodes?spaceType=Layers
                                       
             

getModels -> 1.
=======
    GET api/v1/spaces/:nodeId/children?name={nodeName}    
    
    query parameter nodeName(optional):string
    
example:

    GET api/v1/spaces/56f28e13877f2d2080000002/children

response data example:

=======

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

>>>>>>> 64717de8f5122c8dc140f9036b0d1a2c430c855c
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
<<<<<<< HEAD
>>>>>>> 64717de8f5122c8dc140f9036b0d1a2c430c855c
=======
>>>>>>> 64717de8f5122c8dc140f9036b0d1a2c430c855c


## Written by

-Kevin Ger
