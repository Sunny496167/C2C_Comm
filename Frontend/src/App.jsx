import  { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./Components/hero";
import Dashboard from "./Components/dashboard";
import Navigation from "./Components/navigation";
import Messages from "./Components/messages";
import Forums from "./Components/forums";
import SignIn from "./Components/SignIn";
import Events from "./Components/events";
import Footer from "./Components/footer";




function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark", !darkMode);
  };

  return (
    <div>
      <Router>
        <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/forums" element={<Forums />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
