

function Hero() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto pt-32 px-4 text-center">
        <h1 className="text-5xl font-bold mb-8">
          Welcome to C2C Communication
        </h1>
        <p className="text-xl text-gray-300 mb-12 leading-relaxed">
          Connect, collaborate, and communicate with colleges across the network. 
          Join our platform to share resources, engage in discussions, and expand 
          your academic horizons.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-white text-black px-6 py-3 rounded-md hover:bg-gray-100 font-medium">
            Get Started
          </button>
          <button className="bg-black text-white px-6 py-3 rounded-md border border-white/20 hover:bg-white/10 font-medium">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;