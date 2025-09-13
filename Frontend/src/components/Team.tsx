const Team = () => {
  const medicalTeam = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      specialty: "Cardiology",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Dr. Michael Chen",
      role: "Head of Telemedicine",
      specialty: "Internal Medicine",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section id="team" className="py-16 px-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Medical Team</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experienced professionals dedicated to providing exceptional healthcare
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {medicalTeam.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-blue-600 mb-1">{member.role}</p>
                <p className="text-gray-600">{member.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;