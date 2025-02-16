import { Schema, model } from "mongoose";

const EventSchema = new Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    maxAttendees: { type: Number, required: true, min: 1 },
    type: { type: String, required: true },
    image: { type: String },
    attendees: [{ type: Schema.Types.ObjectId, ref: "User" }] // Stores user IDs
});

export default model("Event", EventSchema);
