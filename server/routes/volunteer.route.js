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
    event.volunteerIDs.push(newVolunteer._id);
    await event.save();

    res.status(201).json({ message: 'Volunteer registered successfully', volunteer: newVolunteer });
  } catch (error) {
    console.error('Error registering volunteer:', error);
    res.status(500).json({ message: 'Failed to register volunteer. Please try again later.' });
  }
});

router.get('/getAllVolunteers', async (req, res) => {
  try {
    const volunteers = await Volunteer.find().populate('eventName', 'name');
    res.status(200).json(volunteers);
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    res.status(500).json({ message: 'Failed to load volunteers. Please try again later.' });
  }
});

router.post('/deleteVolunteer', async (req, res) => {
  const { id } = req.body;

  try {
    // Find the volunteer by ID and delete it
    const deletedVolunteer = await Volunteer.findByIdAndDelete(id);
    
    if (!deletedVolunteer) {
      return res.status(404).json({ success: false, message: 'Volunteer not found' });
    }
    
    // Optionally, also remove references to this volunteer in other collections
    // For example, removing this volunteer from the event's records
    await Event.updateMany(
      { volunteerIDs: id },
      { $pull: { volunteerIDs: id } }
    );
    
    return res.status(200).json({ 
      success: true, 
      message: 'Volunteer successfully deleted',
      deletedVolunteer: deletedVolunteer
    });
  } catch (error) {
    console.error(`Error deleting volunteer with ID "${id}":`, error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to delete volunteer. Please try again later.' 
    });
  }
}
);




module.exports = router;