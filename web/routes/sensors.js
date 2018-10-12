const express = require("express");
const database = require("../../database");
const controller = require("../api/controller");

let router = express.Router();

router.get("/", function(req, res){
    res.header("Content-Type", "application/json");
    let collection = database.getDB().collection('sensors');
    controller.GET(collection, null, function(err, result){
        if(err) throw err;
        res.send(JSON.stringify({"sensors": result}));
        res.status(200).end();
    });
});

router.get("/:id", function (req, res) {
    res.header("Content-Type", "application/json");
    let collection = database.getDB().collection('sensors');
    controller.GET(collection, req.params.id, function(err, result){
        if(err) throw err;
        res.send(JSON.stringify(result));
        res.status(200).end();
    })
});

router.post("/", function (req, res) {
    let collection = database.getDB().collection('sensors');
    controller.POST(collection, req.body, function(err){
        if(err) throw err;
        res.status(201).end();
    })
});

router.delete("/:id", function (req, res) {
    let collection = database.getDB().collection('sensors');
    controller.DELETE(collection, req.params.id, function(err){
        if(err) throw err;
        res.status(200).end();
    });
});

router.put("/:id", function (req, res) {
    let collection = database.getDB().collection('sensors');
    controller.PUT(collection, req.params.id, req.body, function(err){
       if(err) throw err;
       res.status(200).end();
    });
});

module.exports = router;