const Athlete = require("../models/athlete.model");
const User = require("../models/user.model");

const express = require("express");
const router = express.Router();

router.get("/getAllAthletes",async(req,res)=>{
    try{
        const athletes = await Athlete.find().populate("userId", "name email profilePicture")
        res.status(200).json(athletes);
    }catch(error){
        console.error("Error fetching athletes:", error);
        res.status(500).json({ message: "Failed to load athletes. Please try again later." });
    }
})

router.post("/addathlete", async(req,res)=>{
    try{
        const athlete = new Athlete(req.body);
        await athlete.save();
        res.status(200).json({ message: "Athlete added successfully" });
    }catch(error){
        console.error("Error adding athlete:", error);
        res.status(500).json({ message: "Failed to add athlete. Please try again later." });
    }
})

module.exports = router;
