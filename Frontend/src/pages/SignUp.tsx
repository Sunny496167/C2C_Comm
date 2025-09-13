// pages/SignUp.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, Heart } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { Notification } from '../components/Notification';

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('client');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [notifications, setNotifications] = useState<
    { id: number; message: string; type: 'success' | 'error' }[]
  >([]);
  const { fetchData, loading } = useApi();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!acceptTerms) {
      setNotifications(prev => [
        ...prev,
        { id: Date.now(), message: 'You must accept the terms and conditions.', type: 'error' }
      ]);
      return;
    }
  
    try {
      const response = await fetchData('/auth/register', 'POST', {
        body: {
          firstname: firstName,
          lastname: lastName,
          emailId: email, // Make sure to send emailId instead of email
          password,
          isLawyer: userType === 'lawyer', // Fixing this condition
        },
      });
  
      if (response) {
        setNotifications(prev => [
          ...prev,
          { id: Date.now(), message: 'Signup successful! Please check your email.', type: 'success' }
        ]);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Signup failed. Please try again.';
      setNotifications(prev => [
        ...prev,
        { id: Date.now(), message: errorMessage, type: 'error' }
      ]);
    }
  };
  

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-blue-50 p-8 mt-12 rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <Heart className="h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign Up</h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="First Name"
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Email ID"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center flex-1">
              <input
                id="terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Terms and Conditions
                </a>
              </label>
            </div>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="appearance-none rounded-lg px-4 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm w-32"
            >
              <option value="client">Doctor</option>
              <option value="lawyer">Vendor</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={!acceptTerms || loading}
            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
              acceptTerms && !loading
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-300 cursor-not-allowed'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
          >
            {loading ? 'Signing up...' : 'Sign up'}
          </button>

          <div className="text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Log In
            </Link>
          </div>
        </form>

        {/* Notification Container */}
        <div className="fixed bottom-4 right-4 space-y-2">
          {notifications.map(notification => (
            <Notification
              key={notification.id}
              message={notification.message}
              type={notification.type}
              onClose={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}