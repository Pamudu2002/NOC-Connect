const Event = require('../models/event.model');
const Volunteer = require('../models/volunteer.model');
const express = require('express');
const router = express.Router();

router.get('/getAllEvents', async (req, res) => {
  try {
    const events = await Event.find();

    const populatedEvents = await Promise.all(
      events.map(async (event) => {
        const volunteers = await Volunteer.find({ _id: { $in: event.volunteerIDs } }).select('fullName email phoneNumber');

        return {
          name: event.name,
          startDate: event.startDate,
          endDate: event.endDate,
          startTime: event.startTime,
          endTime: event.endTime,
          venue: event.venue,
          description: event.description,
          image: event.image,
          volunteers: volunteers.map(v => ({
            fullName: v.fullName,
            email: v.email,
            phoneNumber: v.phoneNumber
          }))
        };
      })
    );

    res.status(200).json(populatedEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Failed to load volunteer events. Please try again later.' });
  }
});

router.post("/deleteEvent", async (req, res) => {
  const { name } = req.body;
  
  try {
    // Find the event by name and delete it
    const deletedEvent = await Event.findOneAndDelete({ name: name });
    
    if (!deletedEvent) {
      return res.status(404).json({ success: false, message: `Event "${name}" not found` });
    }
    
    // Optionally, also remove references to this event in other collections
    // For example, removing this event from volunteers' records
    await Volunteer.updateMany(
      { eventName: name },
      { $set: { eventName: "" } }
    );
    
    return res.status(200).json({ 
      success: true, 
      message: `Event "${name}" successfully deleted`,
      deletedEvent: deletedEvent
    });
  } catch (error) {
    console.error(`Error deleting event "${name}":`, error);
    return res.status(500).json({ 
      success: false, 
      message: "Error deleting event", 
      error: error.message 
    });
  }
});

router.post('/addEvent', async (req, res) => {
  try {
    const { 
      name, 
      image, 
      startDate, 
      endDate, 
      startTime, 
      endTime, 
      venue, 
      description 
    } = req.body;

    // Validate required fields
    if (!name || !image || !startDate || !endDate || !startTime || !endTime || !venue || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new event
    const newEvent = new Event({
      name,
      image,
      startDate,
      endDate,
      startTime,
      endTime,
      venue,
      description,
      volunteers: [] // Initialize empty volunteers array
    });

    // Save to database
    const savedEvent = await newEvent.save();

    // Return success response
    res.status(201).json(savedEvent);

  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ message: "Failed to add event" });
  }
});


module.exports = router;
