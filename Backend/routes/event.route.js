import { Router } from "express";
import multer from "multer";
import Event from "../models/event.model.js";
import {User}    from "../models/user.model.js";

const router = Router();

// Configure Multer for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Get All Events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// Create New Event (with image upload)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, date, location, maxAttendees } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const event = new Event({
      title,
      date,
      location,
      image,
      maxAttendees: maxAttendees || 50, // Default to 50 if not provided
      attendees: [], // Ensure attendees start empty
    });

    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Register Attendee for an Event
router.post("/:eventId/register", async (req, res) => {
  try {
    const { eventId } = req.params;
    const { userId } = req.body; // Assuming a user ID is passed

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: "Event not found" });

    if (event.attendees.length >= event.maxAttendees) {
      return res.status(400).json({ error: "Event is full" });
    }

    if (!event.attendees.includes(userId)) {
      event.attendees.push(userId);
      await event.save();
    }

    res.json({ message: "Successfully registered", event });
  } catch (err) {
    res.status(500).json({ error: "Failed to register" });
  }
});

// Get a Single Event by ID
router.get("/:eventId", async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ error: "Event not found" });

    res.json(event);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch event" });
  }
});

// Update Event Details
router.put("/:eventId", upload.single("image"), async (req, res) => {
  try {
    const { title, date, location, maxAttendees } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.eventId,
      { title, date, location, maxAttendees, ...(image && { image }) },
      { new: true }
    );

    if (!updatedEvent) return res.status(404).json({ error: "Event not found" });

    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: "Failed to update event" });
  }
});

// Delete an Event
router.delete("/:eventId", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.eventId);
    if (!event) return res.status(404).json({ error: "Event not found" });

    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete event" });
  }
});

// Register a user for an event
router.put("/:id/register", async (req, res) => {
    const { userId } = req.body; // Get user ID from request
    const eventId = req.params.id;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (event.attendees.includes(userId)) {
            return res.status(400).json({ message: "User already registered" });
        }

        if (event.attendees.length >= event.maxAttendees) {
            return res.status(400).json({ message: "Event is full" });
        }

        // Register the user
        event.attendees.push(userId);
        await event.save();

        res.status(200).json({ message: "User registered successfully", event });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
