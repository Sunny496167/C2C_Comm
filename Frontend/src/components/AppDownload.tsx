import { useState, useEffect } from 'react';
import img1 from '/img1.jpg';
import img2 from '/img2.png';
import img3 from '/img3.png';
import { Apple, Smartphone, ArrowRight, Check, Download, Users, ShieldCheck, Stethoscope, Activity } from 'lucide-react';

const AppDownload = () => {
  const [activeScreen, setActiveScreen] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const appScreens = [
    {
      title: "Virtual Consultations Made Easy",
      description: "Connect with certified doctors instantly from anywhere",
      image: img1
    },
    {
      title: "Real-Time Health Monitoring",
      description: "Track vital signs and receive smart health insights",
      image: img2
    },
    {
      title: "Digital Health Records",
      description: "Secure access to your complete medical history",
      image: img3
    }
  ];
  
  const features = [
    { icon: <Users size={20} />, text: "5000+ certified doctors available" },
    { icon: <Activity size={20} />, text: "Real-time health data tracking" },
    { icon: <ShieldCheck size={20} />, text: "HIPAA compliant security" }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveScreen((prev) => (prev + 1) % appScreens.length);
        setIsAnimating(false);
      }, 500);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [appScreens.length]);
  
  return (
    <section className="py-20 px-24 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Download Our <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Medical App</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Your comprehensive healthcare companion for modern medical needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
          <div className="order-2 md:order-1">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">{appScreens[activeScreen].title}</h3>
              <p className="text-gray-600 text-lg">
                {appScreens[activeScreen].description}
              </p>
              
              <div className="space-y-4 mt-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                      {feature.icon}
                    </div>
                    <span className="text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
                  <Apple size={20} />
                  <div className="text-left">
                    <span className="text-xs block">Download on</span>
                    <span className="font-medium">App Store</span>
                  </div>
                  <Download size={16} className="ml-2" />
                </button>
                
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
                  <Smartphone size={20} />
                  <div className="text-left">
                    <span className="text-xs block">Get it on</span>
                    <span className="font-medium">Google Play</span>
                  </div>
                  <Download size={16} className="ml-2" />
                </button>
              </div>
              
              <div className="pt-6">
                <div className="flex items-center gap-2 text-blue-600 hover:text-blue-700 cursor-pointer">
                  <span className="font-medium">Explore all features</span>
                  <ArrowRight size={16} className="transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              {/* Phone Frame */}
              <div className="relative z-10">
                <div className="bg-gray-900 p-3 rounded-[3rem] shadow-2xl">
                  {/* Phone Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-7 bg-gray-900 rounded-b-xl z-20"></div>
                  
                  {/* Screen */}
                  <div className="rounded-[2.5rem] overflow-hidden h-[600px] w-[300px] relative">
                    <div className={`absolute inset-0 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                      <img 
                        src={appScreens[activeScreen].image}
                        alt={`Medical app screen ${activeScreen + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    
                    {/* Screen Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex flex-col justify-end p-6">
                      <div className="space-y-2">
                        <h4 className="text-white text-xl font-bold">{appScreens[activeScreen].title}</h4>
                        <p className="text-white/80 text-sm">{appScreens[activeScreen].description}</p>
                        <button className="bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-medium mt-2 flex items-center gap-2">
                          Book Appointment <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-[-30px] right-[-40px] bg-white p-4 rounded-lg shadow-lg z-20 animate-float">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-1 rounded-full">
                    <Check size={16} className="text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-800">HIPAA Compliant</p>
                </div>
              </div>
              
              <div className="absolute bottom-[100px] left-[-60px] bg-white p-4 rounded-lg shadow-lg z-20 animate-float animation-delay-2000">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-1 rounded-full">
                    <Users size={16} className="text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-800">1M+ Patients</p>
                </div>
              </div>
              
              <div className="absolute bottom-[-20px] right-[20px] bg-white p-4 rounded-lg shadow-lg z-20 animate-float animation-delay-4000">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-1 rounded-full">
                    <Stethoscope size={16} className="text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-800">24/7 Care</p>
                </div>
              </div>
              
              {/* Screen Indicators */}
              <div className="flex justify-center space-x-2 mt-6">
                {appScreens.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      activeScreen === index ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                    onClick={() => {
                      setIsAnimating(true);
                      setTimeout(() => {
                        setActiveScreen(index);
                        setIsAnimating(false);
                      }, 500);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;