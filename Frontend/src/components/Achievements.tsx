import { Award, Globe, Handshake, FlaskConical } from 'lucide-react';

const Achievements = () => {
  const stats = [
    { label: "POC Interests", value: "100+", subtext: "Organizations" },
    { label: "Medical Partnerships", value: "15+", subtext: "Hospitals & Institutions" },
    { label: "Certified Doctors", value: "200+", subtext: "On Platform" },
    { label: "Industry Events", value: "10+", subtext: "Participated" }
  ];

  const achievements = [
    {
      title: "STPI Octane Healthcare Winner",
      description: "Recognized as top healthtech startup in STPI's flagship acceleration program"
    },
    {
      title: "India Mobile Congress 2024",
      description: "Selected to showcase innovation at Asia's largest digital tech exhibition (Oct 15-18, Pragati Maidan), nominated by State Government & TiE NCR"
    },
    {
      title: "Hospital Network Partnerships",
      description: "Established collaborations with leading medical institutions across India"
    },
    {
      title: "Clinical Validation",
      description: "Successful POC implementations with 100+ healthcare organizations"
    }
  ];

  return (
    <section className="py-20 px-24 bg-blue-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Achievements</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Milestones in revolutionizing healthcare through technology and innovation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Metrics Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Key Impact Numbers</h3>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-blue-50 p-4 rounded-lg text-center hover:bg-blue-100 transition-colors">
                  <p className="text-2xl md:text-3xl font-bold text-blue-700 mb-1">{stat.value}</p>
                  <p className="text-sm md:text-base text-gray-600 font-medium">{stat.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.subtext}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recognitions Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Major Recognitions</h3>
            <div className="space-y-5">
              {achievements.map((achievement, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r hover:bg-blue-100 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-full mt-1">
                      {index === 0 ? <Award size={18} className="text-blue-600" /> :
                       index === 1 ? <Globe size={18} className="text-blue-600" /> :
                       index === 2 ? <Handshake size={18} className="text-blue-600" /> :
                       <FlaskConical size={18} className="text-blue-600" />}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{achievement.title}</h4>
                      <p className="text-gray-600 text-sm md:text-base mt-1">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;