const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, profilePicture } = req.body;
    const newUser = new User({ name, email, password, role, profilePicture });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ message: "Failed to register user. Please try again later." });
  }
});

module.exports = router;