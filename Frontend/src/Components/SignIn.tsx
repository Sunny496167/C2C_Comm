import React, { useState } from 'react';
import { GraduationCap, Building2 } from 'lucide-react';

type UserRole = 'student' | 'college' | null;

const SignIn: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Toggle between SignIn and SignUp */}
        {!selectedRole ? (
          <div className="bg-gray-900 rounded-xl shadow-lg p-8 space-y-6">
            <h2 className="text-2xl font-bold text-center text-white mb-8">
              Choose Your Role
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleRoleSelect('student')}
                className="flex flex-col items-center p-6 rounded-lg border-2 border-transparent hover:border-blue-500 transition-all bg-blue-50 hover:bg-blue-100"
              >
                <GraduationCap className="w-12 h-12 text-blue-600 mb-3" />
                <span className="font-medium text-gray-800">Student/Faculty</span>
              </button>
              <button
                onClick={() => handleRoleSelect('college')}
                className="flex flex-col items-center p-6 rounded-lg border-2 border-transparent hover:border-blue-500 transition-all bg-blue-50 hover:bg-blue-100"
              >
                <Building2 className="w-12 h-12 text-blue-600 mb-3" />
                <span className="font-medium text-gray-800">College</span>
              </button>
            </div>
          </div>
        ) : showSignUp ? (
          <div className="bg-gray-900 rounded-xl shadow-lg p-8">
            <button
              onClick={() => setShowSignUp(false)}
              className="text-blue-600 hover:text-blue-700 mb-6 flex items-center"
            >
              ← Back to Sign In
            </button>
            <h2 className="text-2xl font-bold text-center text-white mb-6">
              {selectedRole === 'student' ? 'Student Sign Up' : 'College Sign Up'}
            </h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-white text-white"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-white text-white"
                  placeholder="Create your password"
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-white text-white"
                  placeholder="Confirm your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Sign Up
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-400">
              Already have an account?{' '}
              <button
                onClick={() => setShowSignUp(false)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign In
              </button>
            </p>
          </div>
        ) : (
          <div className="bg-gray-900 rounded-xl shadow-lg p-8">
            <button
              onClick={() => setSelectedRole(null)}
              className="text-blue-600 hover:text-blue-700 mb-6 flex items-center"
            >
              ← Back to role selection
            </button>
            <h2 className="text-2xl font-bold text-center text-white mb-6">
              {selectedRole === 'student' ? 'Student Login' : 'College Login'}
            </h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-white text-white"
                  placeholder={`Enter your ${selectedRole === 'student' ? 'student' : 'college'} email`}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-white text-white"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Sign In
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-400">
              Don't have an account?{' '}
              <button
                onClick={() => setShowSignUp(true)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;

