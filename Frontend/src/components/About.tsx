const About = () => {
  return (
    <section id="about" className="section-padding bg-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            About <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">AizalIQStudios</span>
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl lg:text-2xl max-w-2xl mx-auto">
            A leading healthcare provider committed to delivering exceptional medical services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative md:order-1">
            <img 
              src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
              alt="Modern Healthcare" 
              className="rounded-lg shadow-xl w-full md:h-[580px] h-auto object-cover md:max-w-none"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg animate-float">
              <p className="text-blue-700 font-bold text-xl">50+</p>
              <p className="text-gray-600 text-sm">Expert Doctors</p>
            </div>
          </div>

          <div className="lg:order-2">
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Our Mission</h3>
            <p className="text-gray-600 mb-8 text-lg sm:text-xl">
              We are dedicated to providing comprehensive healthcare services with a focus on patient comfort and advanced medical solutions.
              Our state-of-the-art facilities and experienced medical professionals ensure the highest quality of care.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start hover:bg-blue-200 p-4 rounded-lg transition-all duration-300">
                <div className="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-lg sm:text-xl">Expert Medical Team</h4>
                  <p className="text-gray-600">Highly qualified doctors and medical staff</p>
                </div>
              </div>
              
              <div className="flex items-start hover:bg-blue-200 p-4 rounded-lg transition-all duration-300">
                <div className="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-lg sm:text-xl">Modern Equipment</h4>
                  <p className="text-gray-600">State-of-the-art medical facilities and technology</p>
                </div>
              </div>
              
              <div className="flex items-start hover:bg-blue-200 p-4 rounded-lg transition-all duration-300">
                <div className="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 text-lg sm:text-xl">24/7 Emergency Care</h4>
                  <p className="text-gray-600">Round-the-clock emergency medical services</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;