import { useState } from "react";
import { Calendar, Clock, MapPin, Users, Plus, X, Filter, Search } from "lucide-react";

const currentUser = "CurrentUser"; // Replace this with actual user authentication

const initialEvents = [
  {
    id: 1,
    title: "AI in Education Conference",
    date: "2024-04-15",
    time: "09:00 AM",
    location: "Virtual",
    type: "Conference",
    attendees: 250,
    maxAttendees: 300,
    createdBy: "Admin",
    image: "https://aiexpert.pk/wp-content/uploads/2024/01/Future-of-AI-in-education.png",
  },
  {
    id: 2,
    title: "Research Methodology Workshop",
    date: "2024-04-20",
    time: "02:00 PM",
    location: "Room 301, Science Building",
    type: "Workshop",
    attendees: 50,
    maxAttendees: 50,
    createdBy: "CurrentUser",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
];

function Events() {
  const [events, setEvents] = useState(initialEvents);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    maxAttendees: 1,
    type: "Workshop",
    createdBy: currentUser,
    image: "",
    imageFile: null,
  });

  const handleDeleteEvent = (id, createdBy) => {
    if (createdBy !== currentUser) {
      alert("You can only delete events you created.");
      return;
    }
    setEvents(events.filter(event => event.id !== id));
  };

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.location || newEvent.maxAttendees <= 0) {
      alert("Please fill in all required fields and ensure max attendees is greater than 0.");
      return;
    }
    const eventToAdd = { id: Date.now(), ...newEvent, attendees: 0 };
    setEvents([...events, eventToAdd]);
    setIsFormOpen(false);
  };

  const handleRegister = (id) => {
    setEvents(events.map(event => {
      if (event.id === id && event.attendees < event.maxAttendees) {
        return { ...event, attendees: event.attendees + 1 };
      }
      return event;
    }));
  };

  return (
    <main className="pt-16 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-white">Events</h1>
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2 hover:cursor-pointer transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create Event
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search events..." 
              className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-800 text-white border-gray-700  border focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors" 
              onChange={(e) => setSearchQuery(e.target.value.toLowerCase())} 
            />
          </div>
          <div className="relative w-full md:w-auto">
            <Filter className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <select 
              className="pl-10 p-2 border rounded-md bg-gray-800 text-white w-full md:w-72  focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
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
              <img src={event.image || "https://via.placeholder.com/400"} alt={event.title} className="w-full h-48 object-cover" />
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
                      onClick={() => handleRegister(event.id)}
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
                    className="absolute top-2 right-2 text-white hover:bg-red-500 hover:text-white rounded-full p-1 transition-colors hover:cursor-pointer"
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Create Event</h2>
            <input type="text" placeholder="Title" className="w-full p-2 border rounded mb-2" onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} />
            <input type="date" className="w-full p-2 border rounded mb-2" onChange={(e) => setNewEvent({...newEvent, date: e.target.value})} />
            <input type="time" className="w-full p-2 border rounded mb-2" onChange={(e) => setNewEvent({...newEvent, time: e.target.value})} />
            <input type="text" placeholder="Location" className="w-full p-2 border rounded mb-2" onChange={(e) => setNewEvent({...newEvent, location: e.target.value})} />
            <input type="number" placeholder="Max Attendees" min="1" className="w-full p-2 border rounded mb-2" onChange={(e) => setNewEvent({...newEvent, maxAttendees: parseInt(e.target.value)})} />
            <select className="w-full p-2 border rounded mb-2" onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}>
              <option value="Workshop">Workshop</option>
              <option value="Conference">Conference</option>
              <option value="Information Session">Information Session</option>
              <option value="Session">Session</option>
            </select>
            <button onClick={handleCreateEvent} className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:cursor-pointer">Add Event</button>
            <button onClick={() => setIsFormOpen(false)} className="text-gray-500 mt-2 block text-center hover:cursor-pointer">Cancel</button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Events;
