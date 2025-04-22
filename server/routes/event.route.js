const Event = require('../models/event.model');
const express = require('express');
const router = express.Router();

router.get('/getAllEvents', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Failed to load volunteer events. Please try again later.' });
  }
});

module.exports = router;

