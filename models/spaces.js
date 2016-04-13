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

/** 
 * static methods
*/

SpacesSchema.statics = {
    /**
   * Find node by childType
   *
   * @param {string} childType
   * @api
   */
  GetNodesByChildType: function(childType, callback){
        var promise = new mongoose.Promise;
        if (callback) promise.addBack(callback);

        
        this.find({ childType: childType }).exec(function(err, docs){
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
        this.findOne({ _id: nodeId }).exec(function(err, doc){
            if(err)
                promise.error(err);
            else        
                promise.complete(doc);
        });        
        return promise; 
    },
    
    GetChildTypes: function(callback){        
        return this.find({childType: { $exists: true }}).distinct('childType').exec(callback);
    }
}

SpacesSchema.methods.getNextDepthNode = function(callback){
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

<<<<<<< HEAD
SpacesSchema.methods.getChildTypes = function(callback){
    var promise = new mongoose.Promise;
    if (callback) promise.addBack(callback);   

    var self = this;
    var regPath = new RegExp(self._id);  
    self.constructor.distinct('childType',{ path: regPath }).exec(function(err, docs){
        if(err)
            promise.error(err);
        else        
            promise.complete(docs);
    })   
    return promise;
}

=======
SpacesSchema.plugin(materializedPlugin);
mongoose.model('Space', SpacesSchema);
>>>>>>> 64717de8f5122c8dc140f9036b0d1a2c430c855c

SpacesSchema.plugin(materializedPlugin);
mongoose.model('Space', SpacesSchema);
var model = mongoose.model('Space');

module.exports = model;
