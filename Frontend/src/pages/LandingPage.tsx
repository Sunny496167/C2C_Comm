import { useEffect } from 'react';
import Navbar from '../components/Navbar1';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Feature';
import Solutions from '../components/Solutions';
import AppDownload from '../components/AppDownload';
import Team from '../components/Team';
import Achievements from '../components/Achievements';
import Footer from '../components/Footer';
import PatientJourney from '../components/SupplyChain';


function LandingPage() {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in-section');
      
      elements.forEach((element) => {
        const position = element.getBoundingClientRect();
        
        // Check if element is in viewport
        if (position.top < window.innerHeight - 100) {
          element.classList.add('is-visible');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white text-gray-800">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Solutions />
      <PatientJourney />
      <AppDownload />
      <Team />
      <Achievements />
      <Footer />
    </div>
  );
}

export default LandingPage;