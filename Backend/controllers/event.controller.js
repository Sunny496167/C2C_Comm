import Event from "../models/event.model.js";

// Create Event with Image Upload
export const createEvent = async (req, res) => {
  try {
    const { title, date, time, location, maxAttendees, type } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null; // Store image path

    const newEvent = new Event({ title, date, time, location, maxAttendees, type, image });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error: error.message });
  }
};

// Update Event with Image Upload
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, time, location, maxAttendees, type } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null; // Store image path

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, date, time, location, maxAttendees, type, image },
      { new: true }
    );

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error: error.message });
  }
};
