import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Users, Plus, X, Search, Filter } from "lucide-react";
import axios from "axios";

const currentUser = "CurrentUser"; // Replace with actual user authentication

function Events() {
  const [events, setEvents] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "", 
    maxAttendees: 1,
    type: "Conference",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null); 
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isRSVPd, setIsRSVPd] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/api/events")
      .then(response => setEvents(response.data))
      .catch(error => console.error("Error fetching events:", error));
  }, []);

  const handleRSVP = () => {
    setIsRSVPd(true);
    setTimeout(() => {
      setSelectedEvent(null); // Close modal after 3 sec
    }, 3000);
  };

  const handleDeleteEvent = async (id, createdBy) => {
    if (createdBy !== currentUser) {
      alert("You can only delete events you created.");
      return;
    }
    try {
      await axios.delete(`http://localhost:3000/api/events/${id}`);
      setEvents(events.filter(event => event.id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && ["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setNewEvent({ ...newEvent, image: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      alert("Please upload a valid image file (PNG, JPEG, WEBP)");
    }
  };

  const handleRegister = async (event) => {
    if (!event || !event._id) {
        console.error("Invalid event data:", event);
        return;
    }

    try {
        setSelectedEvent(event); // Store selected event
        setIsRSVPd(false); // Reset RSVP status

        const response = await axios.put(
            `http://localhost:3000/api/events/${event._id}/register`
        );

        setEvents(events.map(e => e._id === event._id ? response.data : e));
        setIsRSVPd(true); // Mark as RSVP'd after successful registration

        alert("Successfully registered for the event!");
    } catch (error) {
        console.error("Error registering for event:", error);
        alert("Failed to register. Please try again.");
    }
};



  const handleAddEvent = async () => {
    if (newEvent.maxAttendees < 1) {
      alert("Max attendees cannot be less than 1.");
      return;
    }

    const formData = new FormData();
    formData.append("title", newEvent.title);
    formData.append("date", newEvent.date);
    formData.append("time", newEvent.time);
    formData.append("location", newEvent.location);
    formData.append("maxAttendees", newEvent.maxAttendees);
    formData.append("type", newEvent.type);
    if (newEvent.image) {
      formData.append("image", newEvent.image);
    }

    try {
      const response = await axios.post("http://localhost:3000/api/events", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setEvents([...events, response.data]);
      setIsFormOpen(false);
      setNewEvent({
        title: "",
        date: "",
        time: "",
        location: "",
        maxAttendees: 1,
        type: "Conference",
        image: null,
      });
      setImagePreview(null);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };


  return (
    <main className="pt-16 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-white">Events</h1>
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2 hover:cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            Create Event
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search events..." 
              className="pl-10 p-2 border rounded-md bg-gray-800 text-white w-full md:w-72" 
              onChange={(e) => setSearchQuery(e.target.value.toLowerCase())} 
            />
          </div>
          <div className="relative w-full md:w-auto">
            <Filter className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <select 
              className="pl-10 p-2 border rounded-md bg-gray-800 text-white w-full md:w-72"
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Conference">Conference</option>
              <option value="Workshop">Workshop</option>
              <option value="Information Session">Information Session</option>
              <option value="Session">Session</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events
            .filter(event => event.title.toLowerCase().includes(searchQuery))
            .filter(event => filterType === "All" || event.type === filterType)
            .map((event) => (
              <div key={event.id} className="relative rounded-lg shadow-lg bg-gray-800 transition">
                <img src={`http://localhost:3000${event.image}`} alt={event.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white">{event.title}</h3>
                  <div className="space-y-2 text-gray-400">
                    <div className="flex items-center"><Calendar className="w-5 h-5 mr-2" /> {new Date(event.date).toLocaleDateString()}</div>
                    <div className="flex items-center"><Clock className="w-5 h-5 mr-2" /> {event.time}</div>
                    <div className="flex items-center"><MapPin className="w-5 h-5 mr-2" /> {event.location}</div>
                    <div className="flex items-center"><Users className="w-5 h-5 mr-2" /> {event.attendees}/{event.maxAttendees} attendees</div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="px-3 py-1 rounded-full text-sm bg-gray-700 text-gray-300">{event.type}</span>
                    {event.attendees < event.maxAttendees ? (
                      <button 
                        onClick={() => handleRegister(event)}
                        className="text-blue-500 hover:text-blue-600 font-medium hover:cursor-pointer"
                      >
                        Register
                      </button>
                    ) : (
                      <span className="text-red-500">Full</span>
                    )}
                  </div>
                  {event.createdBy === currentUser && (
                    <button
                      onClick={() => handleDeleteEvent(event.id, event.createdBy)}
                      className="absolute top-2 right-2 text-white hover:bg-red-500 hover:text-white rounded-full p-1"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
          ))}
        </div>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-semibold mb-4">Create Event</h2>
            <input type="text" placeholder="Title" value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} className="w-full p-2 border rounded mb-2"/>
            <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({...newEvent, date: e.target.value})} className="w-full p-2 border rounded mb-2"/>
            <input type="time" className="w-full p-2 border rounded mb-2" onChange={(e) => setNewEvent({...newEvent, time: e.target.value})} />
            <input type="text" placeholder="Location" className="w-full p-2 border rounded mb-2" onChange={(e) => setNewEvent({...newEvent, location: e.target.value})} />
            <input type="number" placeholder="Max Attendees" min="1" className="w-full p-2 border rounded mb-2" onChange={(e) => setNewEvent({...newEvent, maxAttendees: parseInt(e.target.value)})} />
            <select className="w-full p-2 border rounded mb-2" onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}>
              <option value="Workshop">Workshop</option>
              <option value="Conference">Conference</option>
              <option value="Information Session">Information Session</option>
              <option value="Session">Session</option>
            </select>
            <input type="file" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} className="w-full p-2 border rounded mb-2" />
            {imagePreview && <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover mb-2" />}
            <button onClick={handleAddEvent} className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:cursor-pointer">Add Event</button>
            <button onClick={() => setIsFormOpen(false)} className="text-gray-500 mt-2 block text-center hover:cursor-pointer">Cancel</button>
          </div>
        </div>
      )}

      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <button className="absolute top-2 right-3 text-gray-500" onClick={() => setSelectedEvent(null)}>✖</button>
            <img src={selectedEvent.imageUrl} alt={selectedEvent.name} className="w-full h-40 object-cover rounded-lg" />
            <h3 className="text-xl font-bold mt-3">{selectedEvent.name}</h3>
            <p className="text-gray-600 mt-2">📍 {selectedEvent.location}</p>
            <p className="text-gray-600">📅 {new Date(selectedEvent.date).toLocaleDateString()}</p>

            {/* RSVP Button */}
            <button
              className={`mt-4 px-4 py-2 w-full rounded text-white ${isRSVPd ? "bg-green-500" : "bg-blue-500 hover:bg-blue-700"}`}
              onClick={handleRSVP}
              disabled={isRSVPd}
            >
              {isRSVPd ? "RSVP’d 🎉" : "RSVP Now"}
            </button>
          </div>
        </div>
      )}

    </main>
  );
}

export default Events;
