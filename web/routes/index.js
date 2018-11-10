const express = require("express");
const jwt = require('jsonwebtoken');
const secretKey = require('../../config/config').secret_key;

let router = express.Router();

router.get('/login', function(req, res){
    res.render('login');
});

verify = (req, res, next) =>{
    if(!req.session.token)
        return res.redirect("/login");
    jwt.verify(req.session.token, secretKey, (err, decoded)=> {
        if(err || !decoded) {
            res.clearCookie('user_token');
            req.session.token = undefined;
            return res.redirect('/login');
        }
        req.userId = decoded;
    });
    next();

};

router.get("/", verify, (req, res) =>{
    res.render('index');
});

router.get('/configuration', verify, (req, res) =>{
    res.render('configuration');
});

router.get("/rooms", verify, (req, res) =>{
    res.render('rooms');
});

router.get('/sensors', verify, (req, res) =>{
    res.render('sensors');
});

router.get('/actuators', verify, (req, res) =>{
    res.render('actuators');
});

module.exports = router;