const express = require("express");
const Sensors = require("../../database/models/sensors");

let router = express.Router();


router.get("/", async(req, res) =>{
    try{
        const sensors = await Sensors.find();
        res.status(200).send({sensors});
    }catch(err){
        res.status(400).send({error: "Error in find sensors"});
    }
});

router.get("/:id", async(req, res) =>{
    try{
        const sensors = await Sensors.findOne({_id:req.params.id});
        if(!sensors)
            return res.status(404).send({error: "Sensor not found"});
        res.status(200).send({sensors});
    }catch(err){
        res.status(400).send({error: "Error in find sensors"})
    }
});

router.post("/", async(req, res) =>{
    try{
        if(await Sensors.findOne({pin:req.body.pin}))
            return res.status(400).send({error: "This pin in use"});
        const sensors = await Sensors.create(req.body);
        res.status(201).send({sensors});
    }catch(err){
        res.status(400).send({error: "Error in create sensor"});
    }
});

router.delete("/:id", async(req, res) =>{
   try{
       if(!await Sensors.findOne({_id: req.params.id}))
           return res.status(404).send({error: "Sensor not found"});
       await Sensors.deleteOne({_id:req.params.id});
       res.status(200).send(await Sensors.find());
   }catch(err){
       res.status(400).send({error: "Error in delete sensor"})
   }
});

router.put("/:id", async(req, res) =>{
    try{
        if(!await Sensors.findOne({_id:req.params.id}))
            return res.status(404).send({error: "Sensor not found"});
        await Sensors.update({_id:req.params.id}, req.body);
        res.status(200).send(await Sensors.findOne({_id:req.params.id}));
    }catch(err){
        res.status(400).send({error: {msg:"Error in update sensor", erro: err}})
    }
});

module.exports = router;