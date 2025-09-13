const Solutions = () => {
  const solutions = [
    {
      number: "01",
      title: "Enhanced Patient Care Coordination",
      description: "Implement integrated care management systems to streamline patient journeys across healthcare providers, improving treatment outcomes and reducing medical errors."
    },
    {
      number: "02",
      title: "Telemedicine Integration",
      description: "Develop secure virtual care platforms enabling remote consultations, medication management, and continuous patient monitoring for accessible healthcare delivery."
    },
    {
      number: "03",
      title: "AI-Driven Diagnosis Support",
      description: "Deploy machine learning models for early disease detection, symptom analysis, and treatment recommendation systems to enhance clinical decision-making."
    },
    {
      number: "04",
      title: "Remote Patient Monitoring",
      description: "Utilize IoT-enabled medical devices for real-time tracking of vital signs, medication adherence, and chronic condition management with automated alerts."
    }
  ];

  return (
    <section id="solutions" className="py-20 bg-white px-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Healthcare Solutions</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Innovative approaches addressing modern healthcare challenges through technology and patient-centered care
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <div key={index} className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 font-bold text-xl group-hover:bg-blue-100 transition-colors">
                    {solution.number}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{solution.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{solution.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;