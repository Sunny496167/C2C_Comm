import { Link, useLocation } from "react-router-dom";
import { Calendar, Sun } from "lucide-react";
import PropTypes from "prop-types";

function Navigation({ darkMode, toggleDarkMode, isAuthenticated, onLogout }) {
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
            {/* Show protected routes only if authenticated */}
            {isAuthenticated && (
              <>
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
                <Link
                  to="/events"
                  className={`text-sm hover:text-gray-300 ${
                    location.pathname === "/events"
                      ? "text-blue-500"
                      : darkMode
                      ? "text-gray-300"
                      : ""
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Events
                  </span>
                </Link>
              </>
            )}

            {/* Sign In or Logout Button */}
            {isAuthenticated ? (
              <button
                onClick={onLogout}
                className="text-sm bg-white text-black px-4 py-1.5 rounded-md hover:bg-gray-100"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-sm bg-white text-black px-4 py-1.5 rounded-md hover:bg-gray-100"
              >
                Sign In
              </Link>
            )}

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
  isAuthenticated: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Navigation;