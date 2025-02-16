import { Schema, model } from "mongoose";

const EventSchema = new Schema({
  title: String,
  date: Date,
  time: String,
  location: String,
  type: String,
  attendees: { type: Number, default: 0 },
  maxAttendees: Number,
  createdBy: String,
});

export default model("Event", EventSchema);
