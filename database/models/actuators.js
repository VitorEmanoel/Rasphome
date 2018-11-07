const mogoose = require("mongoose");

const ActuatorScheme = new mogoose.Schema({

    name:{
        type: String,
        require: true
    },
    pin: {
        type: Number,
        unique: true,
        require: true
    }

},{versionKey: false});




const Actuators = mogoose.model('actuators', ActuatorScheme);
module.exports = Actuators;
