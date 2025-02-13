
import { Link, useLocation } from "react-router-dom";
import { Sun } from "lucide-react";
import PropTypes from 'prop-types';

function Navigation({ darkMode, toggleDarkMode }) {
  const location = useLocation();

  return (
    <nav className="fixed w-full z-50 bg-black/95 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold">
              C2C Comm
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link
              to="/dashboard"
              className={`text-sm hover:text-gray-300 ${
                location.pathname === "/dashboard" ? "text-blue-400" : ""
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/messages"
              className={`text-sm hover:text-gray-300 ${
                location.pathname === "/messages" ? "text-blue-400" : ""
              }`}
            >
              Messages
            </Link>
            <Link
              to="/forums"
              className={`text-sm hover:text-gray-300 ${
                location.pathname === "/forums" ? "text-blue-400" : ""
              }`}
            >
              Forums
            </Link>
            {/* Sign-In Button */}
            <Link
              to="/signin"
              className="text-sm bg-white text-black px-4 py-1.5 rounded-md hover:bg-gray-100"
            >
              Sign In
            </Link>
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-1.5 rounded-full hover:bg-gray-800"
              aria-label="Toggle Dark Mode"
            >
              <Sun className={`w-5 h-5 ${darkMode ? "text-yellow-400" : ""}`} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
Navigation.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
};

export default Navigation;

