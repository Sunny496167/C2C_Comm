import { Stethoscope, Activity, Pill, Brain } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Stethoscope size={24} className="text-blue-600" />,
      title: "Virtual Consultations",
      description: "24/7 access to board-certified physicians through secure video conferencing"
    },
    {
      icon: <Activity size={24} className="text-green-600" />,
      title: "Health Monitoring",
      description: "Real-time tracking of vital signs with smart device integration"
    },
    {
      icon: <Pill size={24} className="text-purple-600" />,
      title: "Digital Pharmacy",
      description: "Automatic prescription refills and medication delivery service"
    },
    {
      icon: <Brain size={24} className="text-red-600" />,
      title: "AI Diagnostics",
      description: "Advanced symptom analysis and preliminary diagnosis using AI"
    }
  ];

  return (
    <section id="services" className="py-16 px-24 bg-blue-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Medical Services</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive healthcare solutions combining cutting-edge technology with human expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 mb-4 rounded-lg bg-blue-50 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;