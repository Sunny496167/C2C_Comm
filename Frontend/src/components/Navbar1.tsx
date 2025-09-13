// Navbar.jsx
import { useState, useEffect } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all px-24 duration-300 ${scrolled ? 'bg-blue-50 shadow-md py-4' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-red-600" />
            <span className="font-bold text-xl md:text-2xl">
              <span className="text-red-700">AizalIQ</span>
              <span className="text-blue-600">Studios</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-700 hover:text-blue-600">Services</a>
            <a href="#solutions" className="text-gray-700 hover:text-blue-600">Solutions</a>
            <a href="#telemed" className="text-gray-700 hover:text-blue-600">Telemedicine</a>
            <a href="#team" className="text-gray-700 hover:text-blue-600">Doctors</a>
            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Book Appointment
            </Link>
          </div>

          <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-md py-4 px-4 flex flex-col space-y-4">
            <a href="#services" className="text-gray-700" onClick={() => setIsOpen(false)}>Services</a>
            <a href="#solutions" className="text-gray-700" onClick={() => setIsOpen(false)}>Solutions</a>
            <a href="#telemed" className="text-gray-700" onClick={() => setIsOpen(false)}>Telemedicine</a>
            <a href="#team" className="text-gray-700" onClick={() => setIsOpen(false)}>Doctors</a>
            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center">
              Book Appointment
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar1;