

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Star, MapPin } from "lucide-react";

interface Lawyer {
  _id: string;
  firstname: string;
  middlename: string;
  lastname: string;
  rating: { rating: number }[];
  noOfCases: number;
  yearsOfExperience: number;
  summary: string;
  geoLocation: { city: string };
  profilePic: string;
  isLawyer: boolean;
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [sortOption, setSortOption] = useState("none");
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("authToken"); // Replace "authToken" with your actual key

  const fetchLawyers = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/users/search/lawyers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: search,
          city: location,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch lawyers");
      }

      const data = await res.json();

      // Filter to include only those documents where isLawyer is true
      const filteredLawyers = data.filter((lawyer: Lawyer) => lawyer.isLawyer === true);

      // Map the data to the required format
      const mappedData = filteredLawyers.map((lawyer: Lawyer) => {
        const computedRating =
          lawyer.rating && lawyer.rating.length > 0
            ? lawyer.rating.reduce((sum, r) => sum + (r.rating || 0), 0) / lawyer.rating.length
            : 0;

        return {
          _id: lawyer._id,
          name: `${lawyer.firstname} ${lawyer.middlename ? lawyer.middlename + " " : ""}${lawyer.lastname}`,
          rating: computedRating,
          cases: Number(lawyer.noOfCases) || 0,
          years: Number(lawyer.yearsOfExperience) || 0,
          summary: lawyer.summary,
          location: lawyer.geoLocation.city,
          profilePic: lawyer.profilePic,
        };
      });

      // Sort the data based on the selected option
      let sortedData = mappedData;
      if (sortOption === "ratingLowToHigh") {
        sortedData = mappedData.sort((a, b) => a.rating - b.rating);
      } else if (sortOption === "ratingHighToLow") {
        sortedData = mappedData.sort((a: Lawyer, b: Lawyer) => b.rating - a.rating);
      } else if (sortOption === "popularity") {
        sortedData = mappedData.sort((a: Lawyer, b: Lawyer) => b.cases - a.cases);
      }

      setLawyers(sortedData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch lawyers when search, location, or sort option changes
  useEffect(() => {
    fetchLawyers();
  }, [search, location, sortOption]);

  return (
    <div className="min-h-screen bg-blue-50 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-4 mb-6">
          <div className="relative w-1/4">
            <input
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 pl-10 border rounded-md"
            />
            <MapPin className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
          </div>
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search for vendors across the country"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 pl-10 border rounded-md"
            />
            <Search className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
          </div>
          <div className="w-1/4">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="none">Sort By</option>
              <option value="ratingLowToHigh">Rating: Low to High</option>
              <option value="ratingHighToLow">Rating: High to Low</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">Top Profiles</h1>
        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lawyers.map((lawyer) => (
              <div
                key={lawyer._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex items-center space-x-4 mb-4">
                  {/* Display Profile Picture */}
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img
                      src={lawyer.profilePic}
                      alt={lawyer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {lawyer.name}
                    </h2>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="ml-1 text-gray-600">{lawyer.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600">
                      {lawyer.cases}
                    </div>
                    <div className="text-sm text-gray-600">Orders</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600">
                      {lawyer.rating.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600">
                      {lawyer.years}
                    </div>
                    <div className="text-sm text-gray-600">Years</div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{lawyer.summary}</p>
                <p className="text-blue-600 text-sm font-medium flex items-center">
                  <MapPin className="w-4 h-4 mr-1" /> {lawyer.location}
                </p>
                <Link
                  to={`/lawyer/${lawyer._id}`}
                  className="w-full bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-700 transition block text-center"
                >
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

