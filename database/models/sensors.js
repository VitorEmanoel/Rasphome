const mongoose = require('mongoose');

const SensorsSchema = new mongoose.Schema({

    name:{
       type: String,
       require: true
    },
    pin:{
        type: Number,
        require: true,
        unique: true
    },
    value:{
        type: Number,
        require: false,
        default: 0
    }
}, {versionKey: false});

const Sensors = mongoose.model('sensors', SensorsSchema);
module.exports = Sensors;