// routes/eventRoutes.js

const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const User = require("../models/User");

// Get all events
router.get("/all", async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'name email'); // populate user info if needed
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new event
router.post("/add", async (req, res) => {
  try {
    const { name, place, date, time, availableSeats, createdBy } = req.body;

    // Basic validation
    if (!name || !place || !date || !time) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const newEvent = new Event({
      name,
      place,
      date,
      time,
      availableSeats: availableSeats || 0,
      createdBy
    });

    const savedEvent = await newEvent.save();

    res.status(201).json({ message: "Event created successfully", event: savedEvent });
  } catch (error) {
    console.error("Error creating event:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Edit/update event
router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    console.error("Error updating event:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Delete event
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Get events created by a specific user
router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const userEvents = await Event.find({ createdBy: id });

    res.status(200).json(userEvents);
  } catch (error) {
    console.error("Error fetching user events:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
