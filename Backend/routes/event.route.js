import { Router } from "express";
import Event from "../models/event.model.js";
const router = Router();

// Get all events
router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// Create a new event
router.post("/", async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
