import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Building2, Mail, Lock, Loader } from 'lucide-react';
import { Link, Navigate } from "react-router-dom";
import Input from "../Components/Input";
import { useAuthStore } from "../store/authStore";
import PropTypes from 'prop-types';

const RoleSelection = ({ onRoleSelect }) => {
  return (
    <div className='relative min-h-screen bg-black text-white flex items-center justify-center'>
      <motion.div
	  initial={{ opacity: 0, y: 20 }}
	  animate={{ opacity: 1, y: 0 }}
	  transition={{ duration: 0.5 }} 
	  className="bg-gray-900 rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-white mb-8">
          Choose Your Role
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onRoleSelect('student')}
            className="flex flex-col items-center p-6 rounded-lg border-2 border-transparent hover:border-blue-500 transition-all bg-blue-50 hover:bg-blue-100"
          >
            <GraduationCap className="w-12 h-12 text-blue-600 mb-3" />
            <span className="font-medium text-gray-800">Student/Faculty</span>
          </button>
          <button
            onClick={() => onRoleSelect('college')}
            className="flex flex-col items-center p-6 rounded-lg border-2 border-transparent hover:border-blue-500 transition-all bg-blue-50 hover:bg-blue-100"
          >
            <Building2 className="w-12 h-12 text-blue-600 mb-3" />
            <span className="font-medium text-gray-800">College</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

RoleSelection.propTypes = {
  onRoleSelect: PropTypes.func.isRequired,
};

const LoginPage = ({ role }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password, role);
	Navigate('/dashboard');
  };

  return (
    <div className='relative min-h-screen bg-black text-white flex items-center justify-center'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
      >
        <div className='p-8'>
          <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text'>
            Welcome Back
          </h2>

          <form onSubmit={handleLogin}>
            <Input
              icon={Mail}
              type='email'
              placeholder='Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              icon={Lock}
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className='flex items-center mb-6'>
              <Link to='/forgot-password' className='text-sm text-blue-400 hover:underline'>
                Forgot password?
              </Link>
            </div>
            {error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-500 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? <Loader className='w-6 h-6 animate-spin  mx-auto' /> : "Login"}
            </motion.button>
          </form>
        </div>
        <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
          <p className='text-sm text-gray-400'>
            Don&apos;t have an account?{" "}
            <Link to='/signup' className='text-blue-600 hover:underline'>
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const RoleBasedLogin = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <>
      {selectedRole ? (
        <LoginPage role={selectedRole} />
      ) : (
        <RoleSelection onRoleSelect={setSelectedRole} />
      )}
    </>
  );
};

export default RoleBasedLogin;