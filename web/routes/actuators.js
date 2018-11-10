const express = require("express");
const Actuators = require("../../database/models/actuators");
const GPIO = require('../controller/GPIO');

let router = express.Router();

router.get("/", async(req, res) =>{
    try{
        const actuators = await Actuators.find();
        res.status(200).send({actuators});
    }catch(err){
        res.status(400).send({error: "Error in find Actuators"})
    }
});

router.get("/:id", async(req, res) =>{
    try{
        const actuators = await Actuators.findOne({_id: req.params.id});
        if(!actuators)
            return res.status(404).send({error: "Sensor not found"});
        res.status(200).send(actuators);
    }catch(err){
        res.status(400).send({error: "Error in find actuators"});
    }
});

router.post("/", async(req, res) =>{
    try{
        if(await Actuators.findOne({pin: req.body.pin}))
            return res.status(400).send({error: "This pin in use"});
        const actuators = await Actuators.create(req.body);
        return res.status(201).send({actuators});
    }catch(err){
        res.status(400).send({error: "Error in create actuator"})
    }
});

router.delete("/:id", async(req, res) =>{
    try{
        if(!Actuators.find({_id:req.params.id}))
            return res.status(404).send({error: "Actuator not found"});
        await Actuators.deleteOne({_id: req.params.id});
        const actuators = Actuators.find();
        return res.status(200).send({actuators});
    }catch(err){
        return res.status(400).send({error: "Error in delete actuator"});
    }
});

router.put("/:id", async(req, res) =>{
    try{
        if(!Actuators.findOne({_id: req.params.id}))
            res.status(404).send({error: "Actuator not found"});
        await Actuators.update({_id: req.params.id}, req.body);
        res.status(200).send(await Actuators.findOne({_id: req.params.id}));
    }catch(err){
        return res.status(400).send({error: "Error in update actuator"})
    }
});

module.exports = router;

