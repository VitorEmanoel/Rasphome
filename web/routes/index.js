const express = require("express");
const jwt = require('jsonwebtoken');
const secretKey = require('../../config/config').secret_key;

let router = express.Router();

router.get('/login', function(req, res){
    res.render('login');
});

router.use((req, res, next) =>{

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

});

router.get("/", function(req, res){
    res.render('index');
});

module.exports = router;