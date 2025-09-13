import React from 'react';

interface EducationFormData {
  institute: string;
  degreeName?: string;
  startDate?: string;
  endDate?: string;
  course?: string;
  present?: boolean;
}

interface EducationModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: EducationFormData;
  onChange: (data: EducationFormData) => void;
  onSubmit: () => void;
}

const EducationModal: React.FC<EducationModalProps> = ({
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
        <h3 className="text-xl font-semibold text-blue-700 mb-4 text-center">Education</h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-blue-700 mb-2">School</h4>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Institute Name"
                className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.institute}
                onChange={(e) => onChange({ ...formData, institute: e.target.value })}
              />
              <input
                type="text"
                placeholder="Degree Name"
                className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.deblueame}
                onChange={(e) => onChange({ ...formData, degreeName: e.target.value })}
              />
              <input
                type="text"
                placeholder="Course"
                className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.course}
                onChange={(e) => onChange({ ...formData, course: e.target.value })}
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
                <span>Currently Studying Here</span>
              </label>
            </div>
          </div>
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

export default EducationModal;