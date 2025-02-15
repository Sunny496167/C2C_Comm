import  { useState } from 'react';
import { GraduationCap, Building2 } from 'lucide-react';

const SignIn = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
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
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white"
              />
              <input
                type="password"
                placeholder="Create your password"
                className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white"
              />
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white"
              />
              <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                Sign Up
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-400">
              Already have an account?{' '}
              <button onClick={() => setShowSignUp(false)} className="text-blue-600 hover:text-blue-700">
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
              <input
                type="email"
                placeholder={`Enter your ${selectedRole === 'student' ? 'student/faculty' : 'college'} email`}
                className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white"
              />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md bg-gray-800 text-white"
              />
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-blue-600" />
                  <span className="ml-2 text-sm text-gray-300">Remember me</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700">Forgot password?</a>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                Sign In
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-400">
              Don&apost have an account?{' '}
              <button onClick={() => setShowSignUp(true)} className="text-blue-600 hover:text-blue-700">
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
