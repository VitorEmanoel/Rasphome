const express = require('express');
const Rooms = require('../../database/models/rooms');

let router = express.Router();

router.get("/", async(req, res) =>{
    try{
        const rooms = await Rooms.find().populate(['devices']);
        res.send({rooms});
    }catch(err){
        console.log(err);
        res.status(400).send({error : "Error in find rooms"})
    }

});

router.get("/:id", async(req, res) => {
    try{
        const room = await Rooms.findOne({_id:req.params.id}).populate(['devices']);
        if(!room)
            return res.status(404).send({error: "Room not found"});
        res.send(room);
    }catch(err){
        console.log(err);
        res.status(400).send({error : "Error in find rooms"});
    }

});

router.get("/:id/devices", async(req, res) =>{

    try{
        const room = await Rooms.findOne({_id:req.params.id}).populate(['devices']);
        if(!room)
            return res.status(404).send({error: "Room not found"});
        const { devices } = room;
        res.send({devices});
    }catch(err){
        res.status(400).send({error: "Error in find rooms devices"})
    }

});

router.post("/", async(req, res) =>{

    try{
        const { name, devices } = req.body;
        const room = await Rooms.create({name});
        if(devices) {
            await Promise.all(devices.map(async device => {
                await room.devices.push(device.id);
            }));
            await room.save();
        }
        res.status(201).send(room);
    }catch(err){
        console.log(err);
        res.status(400).send({error: "Error in create room"});
    }
});

router.post("/:id/devices", async(req, res) =>{
    try{
        const room = await Rooms.findOne({_id:req.params.id});
        if(!room)
            return res.status(404).send({error: "Room not found"});
        const { devices } = req.body;
        await Promise.all(devices.map(async device =>{
            room.devices.push(device.id);
        }));
        await room.save();
        const rooms = await Rooms.findOne({_id:req.params.id}).populate('device');
        res.status(201).send({rooms});
    }catch(err){
        console.log(err);
        res.status(400).send({error: "Error in create room device"});
    }
});

router.delete("/:id", async(req, res) =>{
    try{
        if(!await Rooms.findById(req.params.id))
            return res.status(404).send({error : "Room not found"});
        await Rooms.deleteOne({_id: req.params.id});
        const rooms = Rooms.find().populate('device');
        res.send({rooms});
    }catch(err){
        res.status(400).send({error: "Error in delete room"});
    }

});

router.delete("/:id/devices/:pid", async(req, res) =>{

    try{
        const room = await Rooms.findOne({_id:req.params.id});
        if(!room)
            return res.status(404).send({error : "Room not found"});
        if(!room.devices.includes(req.params.id))
            return res.status(404).send({error : "Device not found"});
        room.devices.pull(req.params.pid);
        room.save();
        res.send(await Rooms.findOne({_id:req.params.id}))
    }catch(err){
        console.log(err);
        res.status(400).send({error: "Error in delete room device"});

    }

});

module.exports = router;