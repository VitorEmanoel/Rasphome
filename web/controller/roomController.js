const ObjectID = require("mongodb").ObjectID;

module.exports.IMPORT = async (db, id, body, callback) =>{
    if(!id)
        return callback(new Error("ID not found"));
    let objectId ;
    try{
        objectId = new ObjectID(id);
    }catch(err){
        callback(err);
    }
    let insertObject = await validate(body)
                            .then(process);
    db.updateOne({'_id': objectId}, {$push: {devices: insertObject}}, (err) =>{
        if(err) callback(err);
        callback(null);
    });
};

module.exports.POST = async (db, body, callback) => {
    let insertObject = await validatePOST(body)
                            .then(processPOST);
    db.insertOne(insertObject);
    callback(null);
};

module.exports.REMOVE = (db, id, pid, callback) =>{
    if(!id)
        return callback(new Error("ID not found"));
    if(!pid)
        return callback(new Error("ID not found"));
    let objectId;
    try{
        objectId = new ObjectID(id);
    }catch(err){
        return callback(err);
    }
    db.updateOne({'_id': objectId}, {$pull: {devices: {id:pid}}}, {multi: true}, (err) =>{
        if(err) return callback(err);
        callback(null);
    })
};

function validatePOST(body){
    return new Promise((resolve) =>{
        if(body.name)
            return resolve(body);
    })
}

function processPOST(input) {
    return new Promise((resolve) =>{
       return resolve({name: input.name});
    });
}

function validate(body){
    return new Promise((resolve, reject) =>{
        if(body.id && body.name){
            return resolve(body);
        }
        return reject(body);
    });
}

function process(input) {
    return new Promise((resolve) =>{
        return resolve({id:input.id, name: input.name});
    });
}