const ObjectID = require('mongodb').ObjectID;

module.exports.GET = function(db, id, callback){
    if (!id){
        db.find({}).toArray(function(err, result){
            if(err) return callback(err);
            return callback(null, result);
        });
        return;
    }
    let objectId;
    try{
        objectId = new ObjectID(id);
    }catch(err){
        return callback(new Error("Id is not objectId"));
    }

    db.find({'_id': objectId}).toArray(function(err, result){
        if(err) return callback(err);
        callback(null, result[0]);
    });
};

module.exports.POST = function(db, body, callback){
    let validatedInput = validateInput(body, false);
    console.log(validatedInput);
    if (!validatedInput) {
        return callback(new Error("Invalid POST body"));
    }
    if(Array.isArray(validatedInput)){
        db.insertMany(validatedInput);
        callback(null);
    }else{
        db.insertOne(validatedInput);
        callback(null);
    }
};

module.exports.DELETE = function(db, id, callback){
    if(!id){
        return callback(new Error("Id not found"));
    }
    let objectId;
    try {
        objectId = new ObjectID(id);
    }catch(err){
        return callback(new Error('Id is invalid'));
    }
    db.removeOne({'_id': objectId});
    callback(null);
};

module.exports.PUT = function(db, id, body, callback) {
    if (!id) {
        return callback(new Error("Id not found"));
    }
    let objectId;
    try {
        objectId = new ObjectID(id);
    }catch(err){
        return callback(new Error("Id is not objectId"));
    }
    let validatedInput = validateInput(body, true);
    if (!validatedInput) {
        return callback(new Error("Invalid PUT body"));
    }
    db.updateOne({'_id': objectId}, validatedInput);
    callback(null);
};

function validateInput(data, isput){
    let post_return = null;
    if (Array.isArray(data)) {
        if(isput) throw new Error("Cannot use Array in put");
        post_return = [];
        for (let i = 0; i < data.length; i++)
            if (data[i].name && data[i].pin)
                post_return.push({"name": data[i].name, "pin": data[i].pin})
    } else {
        post_return = {};
        if (isput === true){
            if(data.name)
                post_return.name = data.name;
            if(data.pin)
                post_return.pin = data.pin;
            if(data.value)
                post_return.value = data.value;
            return post_return;
        }
        if (data.name && data.pin)
            post_return = {"name": data.name, "pin": data.pin}
    }
    return post_return;
}