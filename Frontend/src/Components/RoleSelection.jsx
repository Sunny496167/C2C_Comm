import { GraduationCap, Building2 } from 'lucide-react';
import PropTypes from 'prop-types';


const RoleSelection = ({ onRoleSelect }) => {
  return (
    <div className='relative min-h-screen bg-black text-white flex items-center justify-center'>
      <div className="bg-gray-900 rounded-xl shadow-lg p-8 space-y-6">
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
    </div>
    </div>
  );
};

RoleSelection.propTypes = {
  onRoleSelect: PropTypes.func.isRequired,
};

export default RoleSelection;