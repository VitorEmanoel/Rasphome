const GPIO = require('onoff').Gpio;
const ObjectID = require("mongodb").ObjectID;

module.exports.ENABLE = function(db, id){
    return new Promise((resolve, reject) =>{
        let objectId;
        try{
            objectId = new ObjectID(id);
        }catch(err){
            reject(err);
        }
        db.find({"_id": objectId}).toArray((err,result) =>{
            if(err) reject(err);
            if(result.pin) reject(new Error("ID not found"));
            let device = new GPIO(result.pin, 'out');
            device.writeSync(1);
            device.unexport();
            resolve();
        });
    });
};

module.exports.DISBALE = function(db, id){
    return new Promise((resolve, reject) =>{
        let objectId;
        try{
            objectId = new ObjectID(id);
        }catch(err){
            reject(err);
        }
        db.find({"_id": objectId}).toArray((err, result) =>{
           if(err) reject(err);
           if(result.pin) reject(new Error("ID not found"));
           let device = new GPIO(result.pin, 'out');
           device.writeSync(0);
           device.unexport();
           resolve();
        });
    });
};