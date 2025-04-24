const express = require('express');
const router = express.Router();
const Achievement = require('../models/achivement.model.js');

router.get("/:userId", async (req, res) => {
  try {
    const achievements = await Achievement.find({ userId: req.params.userId });
    if (!achievements) {
      return res.status(400).json({ message: "No achievements found" });
    }
    return res.status(200).json(achievements);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
});

module.exports = router;