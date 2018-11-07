const mongoose = require("mongoose");
const crypt = require('bcrypt');

const UserSchema = new mongoose.Schema({

    name:{
       type: String,
       required: true,
       selected: true
    },

    password:{
        type: String,
        required: true,
        selected: false
    }

});

UserSchema.pre('save', async function(next){

    this.password = await crypt.hash(this.password, 10);
    next();

});

const User = mongoose.model('user', UserSchema);

module.exports = User;