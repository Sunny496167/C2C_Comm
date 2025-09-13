import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-red-50 to-purple-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          style={{ animation: 'blob 7s infinite', animationDelay: '0s' }}
          className="absolute top-20 left-10 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        ></div>
        <div
          style={{ animation: 'blob 7s infinite', animationDelay: '2s' }}
          className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        ></div>
        <div
          style={{ animation: 'blob 7s infinite', animationDelay: '4s' }}
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 pt-24">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 inline-block">
            <span className="px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Your Health • Our Priority
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Advanced
            </span>
            <span className="block md:inline"> Healthcare </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Solutions
            </span>
            <span className="block md:inline"> & </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Training
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mb-10">
            Providing exceptional medical care with cutting-edge technology and compassionate professionals dedicated to your well-being.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/appointment"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors duration-300"
            >
              Book Appointment <ArrowRight size={18} />
            </Link>
            <button className="px-6 py-3 bg-white text-blue-600 rounded-full font-medium border-2 border-blue-600 hover:bg-blue-50 transition-colors duration-300">
              Our Services
            </button>
          </div>
          <div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
            onClick={scrollToNext}
          >
            <ChevronDown size={32} className="text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
