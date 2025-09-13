import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Home,
  Users,
  Cloud,
  MessageCircle,
  LogOut,
  User2,
  Menu,
  X,
  Heart,
} from "lucide-react";
import { SlFeed } from "react-icons/sl";

interface NavbarProps {
  setIsAuth: (value: boolean) => void;
}

export default function Navbar({ setIsAuth }: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Retrieve the parameter from the URL (for example, a user id or name)
  

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('authToken');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const userId = getUserIdFromToken();

  // Define navLinks inside the component so that you can use 'name' or any other variable
  const navLinks = [
    { to: "/profile-info", icon: <User2 />, name: "Profile" },
    { to: "/home", icon: <Home />, name: "Home" },
    { to: `/contacts/${userId}`, icon: <Users />, name: "Contacts" },
    { to: "/feed", icon: <SlFeed />, name: "Feed" },
    { to: "/cloud", icon: <Cloud />, name: "Cloud" },
    { to: "/messages", icon: <MessageCircle />, name: "Messages" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("authToken");
      setIsAuth(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-blue-50 shadow-md py-1 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
        <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-red-600" />
            <span className="font-bold text-xl md:text-2xl">
              <span className="text-red-700">AizalIQ</span>
              <span className="text-blue-600">Studios</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`p-2 rounded-lg transition-all relative ${
                  isActive(link.to)
                    ? "text-blue-600 bg-blue-200"
                    : "text-blue-500 hover:text-blue-600 hover:bg-blue-100"
                }`}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  {link.icon}
                </div>
                <span className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {link.name}
                </span>
              </Link>
            ))}

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-red-600 hover:text-red-800 transition-all"
            >
              <LogOut className="w-5 h-5" />
            </button>

            <Link
              to="/getpremium"
              className="ml-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-4 py-2 rounded-md transition-all transform hover:scale-105"
            >
              Get Premium
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col bg-white shadow-md rounded-md mt-2 p-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.icon} <span>{link.name}</span>
              </Link>
            ))}

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>

            <Link
              to="/getpremium"
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-4 py-2 rounded-md transition-all transform hover:scale-105 text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Premium
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
