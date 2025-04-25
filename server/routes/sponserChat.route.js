const chatModel = require("../models/chat.model");
const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// Get all chats for a user
router.get("/:userId", async (req, res) => {
  try {
    const chats = await chatModel.find({
      $or: [{ senderId: req.params.userId }, { receiverId: req.params.userId }],
    })
    .sort({ createdAt: -1 }); // Sort by newest first
    
    if (!chats || chats.length === 0) {
      return res.status(200).json([]); // Return empty array instead of error
    }
    return res.status(200).json(chats);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
});

// Get conversation between two specific users
router.get("/conversation/:userId1/:userId2", async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;
    
    // Validate ObjectIds to prevent MongoDB errors
    if (!mongoose.Types.ObjectId.isValid(userId1) || !mongoose.Types.ObjectId.isValid(userId2)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    
    const messages = await chatModel.find({
      $or: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 }
      ]
    }).sort({ createdAt: 1 }); // Sort by oldest first for chat flow
    
    return res.status(200).json(messages);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
});

// Send a message
router.post("/send", async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    
    // Validate required fields
    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    
    // Validate ObjectIds to prevent MongoDB errors
    if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    
    // Create only one message record (not duplicate as in original code)
    const newChat = new chatModel({
      senderId,
      receiverId,
      message,
    });
    
    await newChat.save();
    return res.status(201).json({ message: "Message sent successfully", chat: newChat });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
});

module.exports = router;