const monoogse = require('mongoose');

const RoomsSchema = new monoogse.Schema({

    name:{
        type: String,
        required: true
    },
    devices:[{
        type: monoogse.Schema.Types.ObjectId,
        ref: 'actuators'
    }]
}, {versionKey: false});

const Rooms = monoogse.model('rooms', RoomsSchema);
module.exports = Rooms;