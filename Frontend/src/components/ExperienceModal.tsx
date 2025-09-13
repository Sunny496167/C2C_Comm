import React from 'react';

interface ExperienceFormData {
  companyName: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  present?: boolean;
}

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: ExperienceFormData;
  onChange: (data: ExperienceFormData) => void;
  onSubmit: () => void;
}

const ExperienceModal: React.FC<ExperienceModalProps> = ({
  isOpen,
  onClose,
  formData,
  onChange,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold text-blue-700 mb-4 text-center">Experience</h3>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Company Name"
            className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.companyName}
            onChange={(e) => onChange({ ...formData, companyName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Role"
            className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.role}
            onChange={(e) => onChange({ ...formData, role: e.target.value })}
          />
          <input
            type="date"
            placeholder="Start Date"
            className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.startDate}
            onChange={(e) => onChange({ ...formData, startDate: e.target.value })}
          />
          <input
            type="date"
            placeholder="End Date"
            className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.endDate}
            onChange={(e) => onChange({ ...formData, endDate: e.target.value })}
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.present}
              onChange={(e) => onChange({ ...formData, present: e.target.checked })}
            />
            <span>Currently Working Here</span>
          </label>
          <textarea
            placeholder="Description"
            className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            value={formData.description}
            onChange={(e) => onChange({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="mt-6">
          <button
            onClick={onSubmit}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Save
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ExperienceModal;