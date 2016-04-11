var mongoose = require('mongoose');
var express = require('express');
var os = require('os');
// var Space = mongoose.model('Space');
var Space = rootRequire('models/Spaces');
var validator = require('express-validator');
var util = require('util');
var async = require('async');


module.exports = function(){
    var router = express.Router();
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
                    //lack async
                    children.forEach(function(childObject){                      
                        var t = parentNode.appendChild(childObject).then(function(data){
                            recursive(childObject, data);
                        })                        
                    })
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
    
    router.get('/getSpaces', function(req, res){
        Space.GetRoot
    })
    
    //query rule: childType
    router.get('/children', function(req, res){
        req.assert('childType', 'error query').notEmpty();
        
        var errors = req.validationErrors();
        if (errors) {
            res.end('There have been validation errors: ' + util.inspect(errors), 400);
            return;
        }                
        var childType = req.query.childType;        
             
        // Space.GetNodesByChildType(childType, function(err, result){
        //     if(err) return console.error(err);
        //     res.end(JSON.stringify(result));
        // })
        Space.GetNodesByChildType(childType).then(function(result){
            res.end(JSON.stringify(result));
        })
})
    
    router.get('/children/:nodeId', function(req, res){        
        var id = mongoose.Types.ObjectId(req.params.nodeId);

        req.assert('limit', 'limit error').optional().isInt();
        var errors = req.validationErrors();
        if (errors) {
            res.end('There have been validation errors: ' + util.inspect(errors), 400);
            return;
        }               
        // var limit = parseInt(req.query.limit)  
        // Space.findOne({ _id: id }).exec().then(function(doc){            
        //     if(limit){
        //         doc.getDescendants({
        //             limit: limit
        //         }).then(function(docs){
        //             res.end(JSON.stringify(docs));
        //         })
        //     }
        //     else{
        //         doc.getChildren().then(function(docs){
        //             res.end(JSON.stringify(docs));
        //         })
        //     }
        // })
        
        Space.GetNode(req.params.nodeId, function(err, doc){
            doc.getNextDepth(function(err, docs){
                res.end(JSON.stringify(docs));
            })
        })        
    })
    
    router.get('/:nodeId/resourcePaths', function(req, res){        
        var id = mongoose.Types.ObjectId(req.params.nodeId);

        req.assert('limit', 'limit error').optional().isInt();
        var errors = req.validationErrors();
        if (errors) {
            res.end('There have been validation errors: ' + util.inspect(errors), 400);
            return;
        }       
        
        var interfaces = os.networkInterfaces();
        var addresses = '';
        for (var i in interfaces) {
            for (var j in interfaces[i]) {
                var address = interfaces[i][j];
                if (address.family === 'IPv4' && !address.internal) {
                    // addresses.push(address.address);
                    addresses = address.address;
                }
            }
        }    
        
        Space.GetNode(req.params.nodeId).then(function(doc){
            var resourcePath = doc.resourcePath.replace('.', addresses);
            res.send(resourcePath);
        })
            

                
        // var limit = parseInt(req.query.limit)  
        // Space.findOne({ _id: id }).exec().then(function(doc){            
        //     if(limit){
        //         doc.getDescendants({
        //             limit: limit,
        //             fields: { resourcePath: 1, _id : 0 }
        //         }).then(function(docs){
        //             async.map(docs, function(doc, callback){
        //                 var replaced = doc.resourcePath.replace('.', addresses)
        //                 callback(null, replaced)
        //             },function(err, result){
        //                 res.end(JSON.stringify(result));
        //             })                    
        //         })
        //     }
        //     else{
        //         doc.getChildren({
        //             fields: { resourcePath: 1, _id : 0 }
        //         }).then(function(docs){
        //             async.map(docs, function(doc, callback){
        //                 var replaced = doc.resourcePath.replace('.', addresses)
        //                 callback(null, replaced)
        //             },function(err, result){
        //                 res.end(JSON.stringify(result));
        //             })    
        //         })
        //     }
        // })
        
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
    
    router.get('/node/:nodeId', function(req, res){        
        // var id = mongoose.Types.ObjectId(req.params.nodeId);
        // Space.findOne({ _id: id }).exec().then(function(doc){
        //     res.end(JSON.stringify(doc));
        // })
        Space.GetNode(req.params.nodeId, function(err, doc){
            var reslut = {
                id: doc._id,                
                parent: doc.parentId,
                text: doc.name
            }
            res.end(JSON.stringify(reslut));
        })
    })
    
    router.get('/treeJsonData', function(req, res){
        // req.query.params        
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
            // console.log(doc.getChildCondition());
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
    
    //get all childtype
    router.get('/childTypes', function(req, res, next){        
        // Space.find({childType: { $exists: true }}).distinct('childType').exec(function(err, docs){
        //     if(err) return console.error(err);   
               
        //     res.end(JSON.stringify(docs));
        // })        
        
        Space.GetChildTypes(function(err, docs){
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
            res.end('delete');
        })
    })
    
    return router;
}