const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const athleteModel = require("../models/athlete.model");
const sponsorModel = require("../models/sponsor.model");
const achievementModel = require("../models/achivement.model");


router.post("/register", async (req, res) => {
  const { user, profile, achievements } = req.body;
  try {
    // Check if user with the same email exists
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    user.password = await bcrypt.hash(user.password, 10);

    const newUser = new User(user);
    await newUser.save();

    if (profile && user.role === "athlete") {
      const newProfile = new athleteModel({ ...profile, userId: newUser._id });
      await newProfile.save();
    }

    if (profile && user.role === "sponsor") {
      const newProfile = new sponsorModel({ ...profile, user: newUser._id }); // Changed to 'user' to match schema
      await newProfile.save();
    }

    if (achievements && achievements.length > 0) {
      const newAchievements = achievements.map((achievement) => ({
        ...achievement,
        userId: newUser._id,
      }));
      await achievementModel.insertMany(newAchievements);
    }

    return res.status(201).json({ message: "User registered successfully" });
  
  } catch (error) {
    console.error("Error registering user:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const NOCTOKEN = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("NOCTOKEN", NOCTOKEN, {
      httpOnly: true,
    });
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get('/logged', async (req, res) => {
  try {
    const token = req.cookies.NOCTOKEN;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching logged user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get('/all', async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching all users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post('/details', async (req, res) => {
  try {

    const { userId } = req.body;
    const user = await User.findById(userId);     
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role === "athlete") {
      const athlete = await athleteModel.findOne({ userId : userId });
      if (!athlete) {
        return res.status(404).json({ message: "Athlete profile not found" });
      }
      const achievements = await achievementModel.find({ userId: userId });
      if (!achievements) {
        return res.status(404).json({ message: "Achievements not found" });
      }
      const details = {
        ...user._doc,
        ...athlete._doc,
        achievements: achievements.map(achievement => ({
          title: achievement.title,
          subtitle: achievement.subtitle,
          description: achievement.description,
          date: achievement.date,
          icon: achievement.icon,
          image: achievement.certificateUrl
        }))
      };
      return res.status(200).json(details);
    }
    if (user.role === "sponsor") {
      const sponsor = await sponsorModel.findOne({ user: userId });
      if (!sponsor) {
        return res.status(404).json({ message: "Sponsor profile not found" });
      }
      const details = {
        ...user._doc,
        ...sponsor._doc
      };
      return res.status(200).json(details);
    }
    return res.status(400).json({ message: "Invalid user role" });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post('/update', async (req, res) => {
  try {
    const { user } = req.body;
    const newUser = {
      name: user.name,
      email: user.email,
    }
    const achievements = user.achievements.map((achievement) => ({
      ...achievement,
      userId: user.userId,
    }));

    const newAthlete = {
      title: user.title,
      location: user.location,
      sport: user.sport,
      bio: user.bio,
      dateOfBirth: user.dateOfBirth,
      education: user.education, 
      gender: user.gender,
      birthPlace: user.birthPlace,
      birthCountry: user.birthCountry,
      height: user.height,
      weight: user.weight,
    };
    
    const response = await User.findByIdAndUpdate(user.userId, newUser, { new: true });
    if (!response) {
      return res.status(404).json({ message: "User not found" });
    }
    const athleteResponse = await athleteModel.findOneAndUpdate({ userId: user.userId }, newAthlete, { new: true });
    if (!athleteResponse) {
      return res.status(404).json({ message: "Athlete profile not found" });
    }
    const achievementResponse = await achievementModel.deleteMany({ userId: user.userId });
    if (!achievementResponse) {
      return res.status(404).json({ message: "Achievements not found" });
    }
    await achievementModel.insertMany(achievements);
    
    return res.status(200).json({ message: "User updated successfully" });
    
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post('/achievements', async (req, res) => {
  try {
    const { userId, achievements } = req.body;
    if (!achievements || achievements.length === 0) {
      return res.status(400).json({ message: "No achievements provided" });
    }
    const newAchievements = achievements.map((achievement) => ({
      ...achievement,
      userId: userId,
    }));
    await achievementModel.insertMany(newAchievements);
    return res.status(201).json({ message: "Achievements added successfully" });
  } catch (error) {
    console.error("Error adding achievements:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get('/logout', async (req, res) => {
  try {
    res.clearCookie("NOCTOKEN", { httpOnly: true });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error logging out:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;