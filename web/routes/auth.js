const express = require('express');
const crypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = require('../../config/config').secret_key;
const User = require("../../database/models/user");

const router = express.Router();

router.post("/", async(req, res) =>{
    const {name, password } = req.body;
    const user = await User.findOne({name}).select('+password');
    if(!user)
        return res.status(404).send({error: "User not found"});

    if(!await crypt.compare(password, user.password))
        return res.status(400).send({error: "Invalid passowrd"});


    const token = jwt.sign({id: user.id}, secretKey);
    req.session.token = token;
    res.redirect('/');

});

router.post('/registration', async(req, res) =>{
    const { name } = req.body;
    if(await User.findOne({name: name}))
        return res.send({error: "User registred"});
    const user = await User.create(req.body);
    res.send(user);
});

module.exports = router;