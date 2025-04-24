const express = require('express');
const router = express.Router();
const Volunteer = require('../models/volunteer.model');
const Event = require('../models/event.model');
const mongoose = require('mongoose');

router.post('/register', async (req, res) => {
  const { fullName, birthDate, email, phoneNumber, address, experience, eventName } = req.body;

  try {
    // Check if the event exists
    console.log(req.body);
    const event = await Event.findOne({ name: eventName });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the volunteer is already registered for the event
    const existingVolunteer = await Volunteer.findOne({
      email,
      eventName,
    });
    if (existingVolunteer) {
      return res.status(400).json({ message: 'Volunteer already registered for event using this email' });
    }

    const existingVolunteer2 = await Volunteer.findOne({
      phoneNumber,
      eventName,
    });
    if (existingVolunteer2) {
      return res.status(400).json({ message: 'Volunteer already registered for event using this phone number' });
    }

    // Create a new volunteer
    const newVolunteer = new Volunteer({
      fullName,
      birthDate,
      email,
      phoneNumber,
      address,
      experience,
      eventName,
    });

    // Save the volunteer to the database
    await newVolunteer.save();

    // Update the event with the new volunteer ID
    event.volunteerIDs.push(newVolunteer._id.toString());
    await event.save();

    res.status(201).json({ message: 'Volunteer registered successfully', volunteer: newVolunteer });
  } catch (error) {
    console.error('Error registering volunteer:', error);
    res.status(500).json({ message: 'Failed to register volunteer. Please try again later.' });
  }
}
);




module.exports = router;