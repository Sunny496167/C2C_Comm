import { Heart, Mail, Phone, MapPin, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
            <Heart className="h-8 w-8 text-red-600" />
            <span className="font-bold text-xl md:text-2xl">
              <span className="text-red-700">AizalIQ</span>
              <span className="text-blue-600">Studios</span>
            </span>
            </div>
            <p className="text-gray-400 mb-6">
              Revolutionizing healthcare through innovative technology and compassionate service
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#services" className="text-gray-400 hover:text-white">Services</a></li>
              <li><a href="#solutions" className="text-gray-400 hover:text-white">Solutions</a></li>
              <li><a href="#telemed" className="text-gray-400 hover:text-white">Telemedicine</a></li>
              <li><a href="#team" className="text-gray-400 hover:text-white">Doctors</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white">Emergency Care</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Health Checkups</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Mental Health</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Surgery</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-blue-400 mr-3 mt-1" />
                <span className="text-gray-400">123 Medical Drive, Health City, HC 12345</span>
              </li>
              <li className="flex items-start">
                <Mail size={20} className="text-blue-400 mr-3 mt-1" />
                <span className="text-gray-400">care@healthcareplus.com</span>
              </li>
              <li className="flex items-start">
                <Phone size={20} className="text-blue-400 mr-3 mt-1" />
                <span className="text-gray-400">(555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} HealthCare+. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;