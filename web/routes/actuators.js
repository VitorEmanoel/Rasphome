const express = require("express");
const controller = require("../api/controller");
const database = require("../../database");

let router = express.Router();

router.get("/", (req, res) =>{
    let collection = database.getDB().collection('actuators');
    controller.GET(collection, null, function(err, result){
        if(err) throw err;
        res.send({"actuators": result});
        res.status(200).end();
    });
});

router.get("/:id", (req, res) =>{
    let collection = database.getDB().collection('actuators');
    controller.GET(collection, req.params.id, function(err, result){
        if(err) throw err;
        res.send(result);
        res.status(200).end();
    })
});

router.post("/", (req, res) =>{
    let collection = database.getDB().collection('actuators');
    controller.POST(collection, req.body, function(err){
        if(err) throw err;
        res.status(201).end();
    })
});

router.delete("/:id", (req, res) =>{
    let collection = database.getDB().collection('actuators');
    controller.DELETE(collection, req.params.id, function(err){
        if(err) throw err;
        res.status(200).end();
    });
});

router.put("/:id", (req, res) =>{
    let collection = database.getDB().collection('actuators');
    controller.PUT(collection, req.params.id, req.body, function(err){
        if(err) throw err;
        res.status(200).end();
    });
});


module.exports = router;

