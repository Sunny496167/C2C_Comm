// PatientJourney.jsx
import { Info } from 'lucide-react';
import { useState } from 'react';

const PatientJourney = () => {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  const journeySteps = [
    { id: 1, title: "Symptom Checker", icon: "🩺", description: "AI-powered symptom analysis and triage system" },
    { id: 2, title: "Doctor Matching", icon: "👨⚕️", description: "Smart matching with specialized physicians" },
    { id: 3, title: "Virtual Visit", icon: "💻", description: "Secure video consultation with your doctor" },
    { id: 4, title: "Treatment Plan", icon: "📋", description: "Personalized care plan with e-prescriptions" },
    { id: 5, title: "Pharmacy", icon: "💊", description: "Digital prescription fulfillment and tracking" },
    { id: 6, title: "Follow-up", icon: "🔄", description: "Continuous monitoring and progress tracking" }
  ];

  return (
    <section className="py-16 bg-indigo-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Patient <span className="text-blue-300">Journey</span>
          </h2>
          <p className="text-indigo-200 max-w-2xl mx-auto">
            Seamless healthcare experience from initial consultation to full recovery
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mb-12 relative">
          {journeySteps.map((step) => (
            <div key={step.id} className="relative group"
              onMouseEnter={() => setActiveNode(step.id)}
              onMouseLeave={() => setActiveNode(null)}
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-2 
                ${activeNode === step.id ? 'bg-white text-blue-600 scale-110' : 'bg-blue-600 text-white'} 
                transition-all duration-300 cursor-pointer`}>
                {step.icon}
              </div>
              <p className="text-sm text-center">{step.title}</p>
              
              {activeNode === step.id && (
                <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 bg-white text-gray-800 p-4 rounded-lg shadow-lg w-64 z-10">
                  <div className="flex items-start">
                    <Info size={16} className="text-blue-600 mt-1 mr-2 flex-shrink-0" />
                    <p className="text-sm">{step.description}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <p className="text-indigo-200">
            Our patient-centric approach ensures continuous care through every stage of treatment, 
            supported by advanced technology and compassionate medical professionals.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PatientJourney;