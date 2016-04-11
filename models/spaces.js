var mongoose = require('mongoose');
var materializedPlugin = require('mongoose-materialized');
var async = require('async');
var Schema = mongoose.Schema;

var SpacesSchema = new Schema({    
    name: String,
    resourcePath: String,
    childType: String,
    remark: String
})

SpacesSchema.plugin(materializedPlugin);

SpacesSchema.statics.GetChildTypes = function(callback){    
    return this.model('Space').find({childType: { $exists: true }}).distinct('childType').exec(callback);
}


/** 
 * static methods
*/

SpacesSchema.statics = {
    /**
   * Find article by id
   *
   * @param {ObjectId} id
   * @api private
   */
  GetNodesByChildType: function(childType, callback){
        var promise = new mongoose.Promise;
        if (callback) promise.addBack(callback);

        var model = this.model('Space');
        model.find({ childType: childType }).exec(function(err, docs){
            if (err || !docs)
                promise.error(err);
            async.concat(docs, function(doc, callback){
                //depth 1
                var regPath = new RegExp(',' + doc._id + '$');                
                model.find({ path: regPath }).exec(function(err, docs){
                    if(err) return console.error(err);                
                    callback(null, docs);                    
                })
            }, function(err, result){
                if (err || !result)
                    promise.error(err); 
                else
                    promise.complete(result);     
            });                
        })        
        return promise;
    },
    
    GetNode: function(nodeId, callback){
        var promise = new mongoose.Promise;
        if (callback) promise.addBack(callback);
        
        if(typeof nodeId === 'string'){
            nodeId = mongoose.Types.ObjectId(nodeId);
        }
        // var self = this.constructor;
        this.model('Space').findOne({ _id: nodeId }).exec(function(err, doc){
            if(err)
                promise.error(err);
            else        
                promise.complete(doc);
        });        
        return promise; 
    }
}

// SpacesSchema.statics.GetNodesByChildType = function(childType, callback){
//     var promise = new mongoose.Promise;
//     if (callback) promise.addBack(callback);
    
//     var model = this.model('Space');
//     model.find({ childType: childType }).exec(function(err, docs){
//         if (err || !docs)
//             promise.error(err);
//         async.concat(docs, function(doc, callback){
//             //depth 1
//             var regPath = new RegExp(',' + doc._id + '$');                
//             model.find({ path: regPath }).exec(function(err, docs){
//                 if(err) return console.error(err);                
//                 callback(null, docs);                    
//             })
//         }, function(err, result){
//             if (err || !result)
//                 promise.error(err); 
//             else
//                 promise.complete(result);     
//         });                
//     })        
//     return promise;
// }

// SpacesSchema.statics.GetNode = function(nodeId, callback){
//     var promise = new mongoose.Promise;
//     if (callback) promise.addBack(callback);
    
//     if(typeof nodeId === 'string'){
//         nodeId = mongoose.Types.ObjectId(nodeId);
//     }
//     // var self = this.constructor;
//     this.model('Space').findOne({ _id: nodeId }).exec(function(err, doc){
//         if(err)
//             promise.error(err);
//         else        
//             promise.complete(doc);
//     });
    
//     return promise;
// }

SpacesSchema.methods.getNextDepth = function(callback){
    var promise = new mongoose.Promise;
    if (callback) promise.addBack(callback);
    
    var self = this;
    var regPath = new RegExp(',' + self._id + '$');  
    self.constructor.find({ path: regPath }).exec(function(err, docs){
        if(err)
            promise.error(err);
        else        
            promise.complete(docs);
    })
    
    return promise;
}

mongoose.model('Space', SpacesSchema);

var model = mongoose.model('Space');

module.exports = model;