var mongoose = require('mongoose');
var express = require('express');
var os = require('os');
// var Space = mongoose.model('Space');
var Space = require('../models/Spaces');
var validator = require('express-validator');
var util = require('util');
var async = require('async');

module.exports = function(){
    
    var router = express.Router();    
    
    function normalize(dbDocument){       
        if(dbDocument.length){      
            async.concat(dbDocument, function(doc, callback){
                var normalizedDocumnet = {
                    id: doc._id,                
                    parent: doc.parentId,
                    text: doc.name
                }                
                callback(null, normalizedDocumnet);
            },function(err, result){
                console.log(result);
                return result;
            })
        }        
        else{
            var normalizedDocumnet = {
                id: dbDocument._id,                
                parent: dbDocument.parentId,
                text: dbDocument.name
            }
            return normalizedDocumnet;             
        }       
    }
    /**
     * Get Server IPAddress
     */
    function getServerAddress(){

        var interfaces = os.networkInterfaces();
        // var addresses = '';
        for (var i in interfaces) {
            for (var j in interfaces[i]) {
                var address = interfaces[i][j];
                if (address.family === 'IPv4' && !address.internal) {
                    // addresses.push(address.address);
                    return address.address;
                }
            }
        }      
    }
    
    router.post('/', function(req, res){
        var treeData = req.body;
        //lack validator
        var root = new Space({
            'name': treeData.name,
            'resourcePath': treeData.resourcePath,
            'remark': treeData.remark,
            'childType': treeData.childType
        }).save(function(err, savedNode){
            var parse = function recursive(treeObjcet, parentNode){
                if(treeObjcet.children){
                    var children = treeObjcet.children;
<<<<<<< HEAD
=======
                    //lack async
>>>>>>> 64717de8f5122c8dc140f9036b0d1a2c430c855c
                    async.each(children, function(childObject, callback){
                        var t = parentNode.appendChild(childObject).then(function(data){
                            recursive(childObject, data);
                            callback(null);
                        })   
                    },function(err){
                        if(err) console.error(err);
<<<<<<< HEAD
                        res.end('post success');
=======
                        res.end('upload success');
>>>>>>> 64717de8f5122c8dc140f9036b0d1a2c430c855c
                    })
                    // children.forEach(function(childObject){                      
                    //     var t = parentNode.appendChild(childObject).then(function(data){
                    //         recursive(childObject, data);
                    //     })                        
                    // })
                }
            }
            parse(treeData, savedNode);
        })
    })
    
    router.get('/', function(req, res, next){
        if(Object.keys(req.query).length != 0){
            Space.findOne({ parentId: null }, function(err, doc){
                if(err) return console.error(err);                
                res.locals.doc = doc;                    
                next();               
            })            
        }
        else{
            Space.find(function (err, data){
                res.end(JSON.stringify(data));    
            })
        }
    })
    
    
    //query rule: childType
    router.get('/nodes', function(req, res){
<<<<<<< HEAD
        req.assert('spaceType', 'error query').notEmpty();
=======
        req.assert('childType', 'error query').notEmpty();
>>>>>>> 64717de8f5122c8dc140f9036b0d1a2c430c855c
        
        var errors = req.validationErrors();
        if (errors) {
            res.end('There have been validation errors: ' + util.inspect(errors), 400);
            return;
        }                
        var childType = req.query.spaceType;        

        Space.GetNodesByChildType(childType).then(function(docs){            
            async.concat(docs, function(doc, callback){
                var node = {
                    id: doc._id,                
                    parent: doc.parentId,
                    text: doc.name
                }
                callback(null, node);
            }, function(err, result){
                if(err) return console.error(err);
                // console.log(result)
                res.end(JSON.stringify(result));
            })
        })
    })  
    
<<<<<<< HEAD
    /**
     * Get next depth child node from parent node
     * 
     * @route params:nodeId
     * @optional query:childNodeName
     */
    router.get('/:nodeId/children', function(req, res){            
=======
    router.get('/:nodeId/children', function(req, res){       
        
>>>>>>> 64717de8f5122c8dc140f9036b0d1a2c430c855c
        req.assert('name', 'error query').optional();
        var errors = req.validationErrors();
        if (errors) {
            res.end('There have been validation errors: ' + util.inspect(errors), 400);
            return;
        }        
        var nodeName = req.query.name;     
        if(nodeName){
            Space.GetNode(req.params.nodeId, function(err, doc){
                doc.getNextDepthNode(function(err, docs){           
                    async.detect(docs, function(doc, callback){                        
                        callback(null, doc.name == nodeName);
                    }, function(err, result){
                        if(err || !result){
                            res.end('none found');
                            return console.error(err);
                        }                        
                        res.end(JSON.stringify(normalize(result)));
                    })   
                })
            })  
        }
<<<<<<< HEAD
        else{           
            Space.GetNode(req.params.nodeId, function(err, doc){
                doc.getNextDepthNode(function(err, docs){
                    async.concat(docs, function(doc, callback){
                        var node = {
                            id: doc._id,                
                            parent: doc.parentId,
                            text: doc.name
                        }
                        callback(null, node);
                    }, function(err, result){
                        if(err) return console.error(err);
                        // console.log(result)
                        res.end(JSON.stringify(result));
                    })
                })
            })  
        }      
    })       
    
    router.get('/:nodeId/model/', function(req, res){        
=======
        
        var nodeName = req.query.name;     
        if(nodeName){
            Space.GetNode(req.params.nodeId, function(err, doc){
                doc.getNextDepthNode(function(err, docs){           
                    async.detect(docs, function(doc, callback){                        
                        callback(null, doc.name == nodeName);
                    }, function(err, result){
                        if(err || !result){
                            res.end('none found');
                            return console.error(err);
                        } 
                        res.end(JSON.stringify(result));
                    })   
                })
            })  
        }
        else{           
            Space.GetNode(req.params.nodeId, function(err, doc){
                doc.getNextDepthNode(function(err, docs){
                    res.end(JSON.stringify(docs));
                })
            })  
        }      
    })
    
    
    
    router.get('/resourcePath/:nodeId/', function(req, res){        
>>>>>>> 64717de8f5122c8dc140f9036b0d1a2c430c855c
        var id = mongoose.Types.ObjectId(req.params.nodeId);

        req.assert('limit', 'limit error').optional().isInt();
        var errors = req.validationErrors();
        if (errors) {
            res.end('There have been validation errors: ' + util.inspect(errors), 400);
            return;
        }       
        var address = getServerAddress();
        Space.GetNode(req.params.nodeId).then(function(doc){       
            if(doc.resourcePath == ''){
                return res.end('none of path');                
            }
<<<<<<< HEAD

            var resourcePath = doc.resourcePath.replace('.', address);
            res.end(resourcePath);            
        })                   
=======
        }        
        Space.GetNode(req.params.nodeId).then(function(doc){
            var resourcePath = doc.resourcePath.replace('.', addresses);
            res.send(resourcePath);
        })            
        
>>>>>>> 64717de8f5122c8dc140f9036b0d1a2c430c855c
    })
    
    router.get('/roots', function(req, res){
        Space.GetRoots({
            fields:{
                _id: 1,
                name: 1
            }
        }).then(function(roots){
            res.end(JSON.stringify(roots));
        })
    })
    
    router.get('/:nodeId', function(req, res, next){
<<<<<<< HEAD
        if(req.params.nodeId == 'spacetypes') next();
        else{
            Space.GetNode(req.params.nodeId, function(err, doc){
                var result = normalize(doc);
                res.end(JSON.stringify(result));
            })
        }
    })    
            
    //get all spacesTypes
    router.get('/spacetypes', function(req, res, next){  
        Space.GetChildTypes(function(err, docs){
            if(err) return console.error(err);                  
            res.end(JSON.stringify(docs));
        })  
    })       
    

    router.get('/:nodeId/spacetypes', function(req, res, next){        
        Space.GetNode(req.params.nodeId, function(err, doc){
            doc.isRoot(function(err, answer){
                if(answer){
                    doc.getChildTypes(function(err, docs){
                        if(err) return console.error(err);                  
                        res.end(JSON.stringify(docs));
                    })
                }
                else{
                    res.end(req.params.nodeId + ' not a root id');
                }
            })
        })       

    })     
    

=======
        if(req.params.nodeId == 'childtypes') next();
        else{
            Space.GetNode(req.params.nodeId, function(err, doc){
                var reslut = {
                    id: doc._id,                
                    parent: doc.parentId,
                    text: doc.name
                }
                res.end(JSON.stringify(reslut));
            })
        }
    })    
        
    //get all childtype
    router.get('/childtypes', function(req, res, next){        
        Space.GetChildTypes(function(err, docs){
            if(err) return console.error(err);                  
            res.end(JSON.stringify(docs));
        })
    })       
    
>>>>>>> 64717de8f5122c8dc140f9036b0d1a2c430c855c
    
    router.get('/:nodeId/treeJsonData', function(req, res){
        var id = req.query.params;
        console.log(id);        
        Space.GetFullTree().then(function(tree){
            res.end(JSON.stringify(tree));
        })        
    })  
    
    //query spacename
    router.get('/spaceName/:spaceName', function(req, res){
        Space.findOne({ parentId: null }).exec(function(err, doc){
            if(err) return console.error(err);
            doc.getChildren({
                condition: { name: req.params.spaceName },
                fields:{name: 1, resourcePath: 1},
                sort: {name: 1}
            },function(err, docs){                 
                if(err) return console.error(err);                
                res.end(JSON.stringify(docs));
            })
        })        
    })
    
    //just for test
    router.get('/test', function(req, res){     
        req.assert('limit', 'error query').notEmpty().isInt();
        req.assert('skip', 'error query').notEmpty().isInt();
        var errors = req.validationErrors();
        if (errors) {
            res.send('There have been validation errors: ' + util.inspect(errors), 400);
            return;
        }        
                
        Space.findOne({ parentId: null }).exec(function(err, doc){
            if(err) return console.error(err);
            doc.getDescendants({ limit: parseInt(req.query.limit), skip: parseInt(req.query.skip) },function(err, docs){                 
                if(err) return console.error(err);                
                res.end(JSON.stringify(docs));
            })
        })        
    })
    
    //query materilzedPath
    router.get('/path/:path', function(req, res){     
        var regPath = new RegExp(',' + req.params.path);
                
        Space.find({ path: regPath }).exec(function(err, docs){
            if(err) return console.error(err);      
            res.end(JSON.stringify(docs));            
        })        
    })   

    router.put('/', function(req, res){
        // not implement
        res.end('not implement');
    })   
    
    
    router.delete('/', function(req, res){
        Space.remove({}, function(err){
            if(err) return console.error(err);
            res.end('delete success');
        })
    })
    
    return router;
}