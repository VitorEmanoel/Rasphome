const express = require('express');
const roomController = require("../api/roomController");
const controller = require("../api/controller");
const database = require("../../database");

let router = express.Router();

router.get("/", (req, res) =>{
    let db = database.getDB().collection("rooms");
    controller.GET(db, null, (err, result)=>{
        if(err) throw err;
        res.send({"rooms": result});
        res.status(200).end();
    });
});

router.get("/:id", (req, res) => {
    let db = database.getDB().collection("rooms");
    controller.GET(db, req.params.id, (err, result) =>{
        if(err) throw err;
        res.send(result);
        res.status(200).end()
    });
});

router.get("/:id/devices", (req, res) =>{
    let db = database.getDB().collection("rooms");
    controller.GET(db, req.params.id, (err, result) =>{
       if(err) throw err;
       res.send({"devices": result.devices});
       res.status(200).end();
    });
});

router.get("/:id/devices/:pid", (req, res) =>{
   let db = database.getDB().collection("rooms");
   controller.GET(db, req.params.id, (err, result) =>{
       if(err) throw err;
       res.send(result.devices.find(device => {return device.id === req.params.pid}));
   });
});

router.post("/", async (req, res) =>{
    let db = database.getDB().collection("rooms");
    await roomController.POST(db, req.body, (err) =>{
       if(err) throw err;
       res.status(201).end();
    });
});

router.post("/:id/devices", async (req, res) =>{
   let db = database.getDB().collection("rooms");
   await roomController.IMPORT(db, req.params.id , req.body, (err) =>{
      if(err) throw err;
      res.status(201).end();
   });

});

router.delete("/:id", (req, res) =>{
    let db = database.getDB().collection("rooms");
    controller.DELETE(db, req.params.id, (err) =>{
        if(err) throw err;
        res.status(200).end();
    });
});

router.delete("/:id/devices/:pid", (req, res) =>{
   let db = database.getDB().collection("rooms");
   roomController.REMOVE(db, req.params.id, req.params.pid, (err)=>{
        if(err) throw err;
        res.status(200).end();
   });
});

module.exports = router;