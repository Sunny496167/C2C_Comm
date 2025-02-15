import  { useState } from "react";
import { Calendar, Clock, MapPin, Users, Plus, Search, Filter } from "lucide-react";

const upcomingEvents = [
  {
    id: 1,
    title: "AI in Education Conference",
    date: "2024-04-15",
    time: "09:00 AM",
    location: "Virtual",
    type: "Conference",
    attendees: 250,
    image:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Research Methodology Workshop",
    date: "2024-04-20",
    time: "02:00 PM",
    location: "Room 301, Science Building",
    type: "Workshop",
    attendees: 50,
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Student Exchange Program Info Session",
    date: "2024-04-25",
    time: "11:00 AM",
    location: "Main Auditorium",
    type: "Information Session",
    attendees: 150,
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
];

// eslint-disable-next-line react/prop-types
function Events({ darkMode }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const eventTypes = ["All", "Conference", "Workshop", "Information Session", "Seminar"];

  const filteredEvents = upcomingEvents.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All" || event.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <main className={`pt-16 min-h-screen ${darkMode ? "bg-black" : "bg-gray-50"} transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-2xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Events</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create Event
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-md ${
                darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-200"
              } border focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors`}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className={`pl-10 pr-8 py-2 rounded-md ${
                darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900 border-gray-200"
              } border focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors`}
            >
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className={`rounded-lg overflow-hidden shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"} transition-colors`}>
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>{event.title}</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-500">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Users className="w-5 h-5 mr-2" />
                    <span>{event.attendees} attendees</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"}`}>{event.type}</span>
                  <button className="text-blue-500 hover:text-blue-600 font-medium">Register</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Events;
