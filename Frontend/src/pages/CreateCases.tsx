
import React, { useState } from 'react';
import { X, Search, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const CreateCases: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'regular' | 'consultancy'>('regular');

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <motion.div 
        className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create Application</h2>
          <button className="text-gray-500 hover:text-gray-700">
            <X />
          </button>
        </div>
        <div className="border-b mb-4">
          <ul className="flex">
            <li className="mr-4">
              <button 
                className={`py-2 px-4 ${activeTab === 'regular' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                onClick={() => setActiveTab('regular')}
              >
                Regular
              </button>
            </li>
            <li>
              <button 
                className={`py-2 px-4 ${activeTab === 'consultancy' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                onClick={() => setActiveTab('consultancy')}
              >
                Consultancy
              </button>
            </li>
          </ul>
        </div>
        {activeTab === 'regular' ? (
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Case Name:</label>
              <input type="text" placeholder="Case Name" className="w-full mt-1 p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Clients:</label>
              <div className="relative">
                <input type="text" placeholder="Search contacts" className="w-full mt-1 p-2 border rounded" />
                <button className="absolute right-2 top-2 text-gray-500 hover:text-gray-700">
                  <Search />
                </button>
              </div>
            </div>
            <div className="mb-4 flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700">Date of birth:</label>
                <div className="relative">
                  <input type="text" placeholder="dd-mm-yyyy" className="w-full mt-1 p-2 border rounded" />
                  <button className="absolute right-2 top-2 text-gray-500 hover:text-gray-700">
                    <Calendar />
                  </button>
                </div>
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700">Contact Number:</label>
                <input type="text" placeholder="Phone no." className="w-full mt-1 p-2 border rounded" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email ID:</label>
              <input type="email" placeholder="Email ID" className="w-full mt-1 p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Address:</label>
              <input type="text" placeholder="Address" className="w-full mt-1 p-2 border rounded" />
            </div>
            <div className="flex justify-end space-x-4">
              <button type="button" className="py-2 px-4 border rounded text-gray-700 hover:bg-gray-100">Cancel</button>
              <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">Create</button>
            </div>
          </form>
        ) : (
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Consultancy Name:</label>
              <input type="text" placeholder="Consultancy Name" className="w-full mt-1 p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Clients:</label>
              <div className="relative">
                <input type="text" placeholder="Search contacts" className="w-full mt-1 p-2 border rounded" />
                <button className="absolute right-2 top-2 text-gray-500 hover:text-gray-700">
                  <Search />
                </button>
              </div>
            </div>
            <div className="mb-4 flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700">Date of birth:</label>
                <div className="relative">
                  <input type="text" placeholder="dd-mm-yyyy" className="w-full mt-1 p-2 border rounded" />
                  <button className="absolute right-2 top-2 text-gray-500 hover:text-gray-700">
                    <Calendar />
                  </button>
                </div>
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700">Contact Number:</label>
                <input type="text" placeholder="Phone no." className="w-full mt-1 p-2 border rounded" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email ID:</label>
              <input type="email" placeholder="Email ID" className="w-full mt-1 p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Address:</label>
              <input type="text" placeholder="Address" className="w-full mt-1 p-2 border rounded" />
            </div>
            <div className="flex justify-end space-x-4">
              <button type="button" className="py-2 px-4 border rounded text-gray-700 hover:bg-gray-100">Cancel</button>
              <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">Create</button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default CreateCases;