const ObjectID = require('mongodb').ObjectID;

module.exports.GET = function(db, path, callback){
    if(path.length === 3){
        db.find({}).toArray(function(err, result){
            if(err) return callback(err);
            callback(null, result)
        })
    }else if(path.length === 4){
        if(!path[3]){
            return callback(new Error("Not found"))
        }
        let objectId;
        try{
            objectId = new ObjectID(path[3])
        }catch(err){
            return callback(err)
        }
        db.find({'_id':  objectId}).toArray(function(err, result){
            if(err) callback(err);
            callback(null, result)
        })
    }
};

module.exports.POST = function(db, req, callback){
    let post_data = [];
    req.on('data', function(data){
        post_data.push(data)
    });
    req.on('end', function(){
        let json = [];
        try {
            if (post_data.length > 1) {
                json = post_data[0];
            } else {
                for(let i = 0; i < post_data.length; i++){
                    json[0] = JSON.parse(post_data[i]);
                }
            }
        }catch(e){
            callback(e)
        }
        let validatedJson = validadePOSTinput(json);
        if(!validatedJson){
            return callback(new Error('Invalid'))
        }
        if(validadePOSTinput){
            if(Array.isArray(validatedJson)){
                db.insertMany(validatedJson);
                callback(null)
            }else{
                db.insertOne(validatedJson);
                callback(null)
            }
        }
    })
};

module.exports.PUT = function(db, path, req, callback){
    if(path.length === 4 && path[3]){
        let objectId;
        try{
            objectId = new ObjectID(path[3])
        }catch(err){
            return callback(err)
        }
        let put_data = [];
        req.on('data', function(data){
            put_data.push(data)
        });
        req.on('end', function(){
            let validadetedJson = validatePUTinput(put_data);
            if(!validadetedJson){
                return callback(new Error("Not found"))
            }
            db.updateOne({'_id': objectId}, JSON.parse(validadetedJson));
            callback(null)
        })
    }else{
        callback(new Error("Not found"))
    }
};

module.exports.DELETE = function(db, path, callback){
    let objectId;
    if(path.length === 4 && path[3]){
        try{
            objectId = new ObjectID(path[3])
        }catch(err){
            return callback(err)
        }
        db.removeOne({'_id': objectId});
        callback(null)
    }else{
        callback(new Error("Not found"))
    }
};

function validatePUTinput(data){
    let put_return = null;
    if(Array.isArray(data))
        data = data[0];
    if(data.name)
        put_return = {"name": data.name};
    if(data.pin)
        put_return.pin = data.pin;
    if(data.value)
        put_return.value = data.value;
    return put_return
}

function validadePOSTinput(data){
    let post_return = null;
    if(Array.isArray(data)){
        post_return = [];
        for(let i = 0; i < data.length; i++){
            if(data[i].name && data[i].pin){
                post_return.push({"name": data[i].name, "pin": data[i].pin})
            }
        }
    }else{
        if(data.name && data.pin){
            post_return = {"name": data.name, "pin": data.pin}
        }
    }
    return post_return;
}