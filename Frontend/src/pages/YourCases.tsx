import React from 'react';
import { Home, Users, Bell, Cloud, MessageCircle, LogOut, Plus, Search, Download, Instagram, Twitter, Facebook } from 'lucide-react';

const YourCases: React.FC = () => {
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob(["Case Notes: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus elit arcu, vestibulum in convallis eu, luctus ac massa. Praesent vitae venenatis arcu. Sed sit amet tellus sed sem mollis ultrices. Vestibulum congue erat eget magna interdum, a porttitor metus malesuada. Fusce ut diam rutrum mauris suscipit mollis. Morbi vestibulum lorem orci. Integer ultricies ut justo accumsan ultricies. Phasellus viverra posuere vestibulum. Vestibulum semper sed dolor malesuada sollicitudin. Vivamus dapibus porttitor odio quis iaculis. Sed tincidunt magna eu neque viverra, sit amet euismod dui elementum. Maecenas sit amet laoreet felis, ut vehicula nisi. Pellentesque ligula erat, facilisis nec eros ac, convallis eleifend tortor. Vestibulum dapibus purus in nisi semper, a tincidunt libero vehicula. Integer nec magna at libero fermentum tincidunt."], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "case_notes.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="https://storage.googleapis.com/a1aa/image/rNIUc4VFf_zu5cONHXCA8VgSlMDhMJzDJPN09eo1NpI.jpg" alt="Golicit Logo" className="h-10" />
          <h1 className="text-2xl font-bold text-blue-900 ml-2">AgriTech</h1>
        </div>
        <div className="flex space-x-4">
          <Home className="text-xl text-gray-600" />
          <Users className="text-xl text-gray-600" />
          <Bell className="text-xl text-gray-600" />
          <Cloud className="text-xl text-gray-600" />
          <MessageCircle className="text-xl text-gray-600" />
          <button className="bg-red-500 text-white px-4 py-2 rounded">Get Premium</button>
          <LogOut className="text-xl text-gray-600" />
        </div>
      </header>
      <main className="flex p-4">
        <aside className="w-1/4 bg-white shadow-md p-4 rounded">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Cases</h2>
            <button className="bg-gray-200 p-2 rounded">
              <Plus />
            </button>
          </div>
          <div className="relative mb-4">
            <input type="text" placeholder="Search case by ID" className="w-full p-2 border rounded" />
            <Search className="absolute right-3 top-3 text-gray-500" />
          </div>
          <ul>
            <li className="p-2 bg-gray-200 rounded mb-2">HS-126347b87587</li>
            <li className="p-2 bg-gray-200 rounded mb-2">HS-126395bce744</li>
          </ul>
        </aside>
        <section className="w-3/4 bg-white shadow-md p-4 rounded ml-4">
          <h2 className="text-xl font-bold mb-4">Case ID: HS-126347b87587</h2>
          <p><strong>Client Name:</strong> Hrithik Ghanty, Soumya Sen</p>
          <p><strong>Date Of Birth:</strong> Aug 06, 2021</p>
          <p><strong>Contact Number:</strong> 88888888</p>
          <p><strong>Email:</strong> hrithik.ghanty@gmail.com</p>
          <p><strong>Address:</strong> Asansol, West Bengal</p>
          <p><strong>Case Sections:</strong> 102, 103</p>
          <p><strong>Defenders:</strong> Someone 1, Someone 2</p>
          <h3 className="font-bold mt-4">Case Notes:</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus elit arcu, vestibulum in convallis eu, luctus ac massa. Praesent vitae venenatis arcu. Sed sit amet tellus sed sem mollis ultrices. Vestibulum congue erat eget magna interdum, a porttitor metus malesuada. Fusce ut diam rutrum mauris suscipit mollis. Morbi vestibulum lorem orci. Integer ultricies ut justo accumsan ultricies. Phasellus viverra posuere vestibulum. Vestibulum semper sed dolor malesuada sollicitudin. Vivamus dapibus porttitor odio quis iaculis. Sed tincidunt magna eu neque viverra, sit amet euismod dui elementum. Maecenas sit amet laoreet felis, ut vehicula nisi. Pellentesque ligula erat, facilisis nec eros ac, convallis eleifend tortor. Vestibulum dapibus purus in nisi semper, a tincidunt libero vehicula. Integer nec magna at libero fermentum tincidunt.</p>
          <button onClick={handleDownload} className="fixed bottom-4 right-4 bg-gray-200 p-4 rounded-full shadow-lg">
            <Download />
          </button>
        </section>
      </main>
      <footer className="bg-blue-900 text-white p-4 flex justify-around">
        <div>
          <h3 className="font-bold">CONTACT US</h3>
        </div>
        <div>
          <h3 className="font-bold">SERVICES</h3>
          <div className="flex space-x-4 mt-2">
            <Instagram className="text-xl" />
            <Twitter className="text-xl" />
            <Facebook className="text-xl" />
          </div>
        </div>
        <div>
          <h3 className="font-bold">INFORMATION</h3>
        </div>
      </footer>
    </div>
  );
};

export default YourCases;
