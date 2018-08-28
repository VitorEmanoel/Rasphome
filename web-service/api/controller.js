const ObjectID = require('mongodb').ObjectID

module.exports.GET = function(db, path, callback){
    if(path.length == 3){
        db.find({}).toArray(function(err, result){
            if(err) callback(err)
            callback(null, result)
        })
    }else if(path.length == 4){
        if(path[3] !== ''){
            var objectId = new ObjectID(path[3])
            db.find({'_id':  objectId}).toArray(function(err, result){
                if(err) callback(err)
                callback(null, result)
            })
        }
    }
}

module.exports.POST = function(db, req){
    var post_data = []
    req.on('data', function(data){
        post_data.push(data)
    })
    req.on('end', function(){
        var json = JSON.parse(post_data.toString())
        if(Array.isArray(json)){
            db.insertMany(json)
        }else{
            db.insertOne(json)
        }
    })
}

module.exports.PUT = function(db, path, req){
    if(path.length == 4){
        var objectId = new ObjectID(path[3])
        var put_data = []
        req.on('data', function(data){
            put_data.push(data)
        })
        req.on('end', function(){
            db.updateOne({'_id': objectId}, JSON.parse(put_data.toString()))
        })
    }
}

module.exports.DELETE = function(db, path){
    if(path.length == 4){
        var objectId = new ObjectID(path[3])
        db.removeOne({'_id': objectId})
    }
}