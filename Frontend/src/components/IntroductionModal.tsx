import React from 'react';

interface IntroFormData {
  firstName: string;
  lastName: string;
  birthDate: string;
  summary: string;
  profilePic: string;
}

interface IntroductionModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: IntroFormData;
  onChange: (data: IntroFormData) => void;
  onSubmit: () => void;
  onImageUpload: (file: File) => void;
}

const IntroductionModal: React.FC<IntroductionModalProps> = ({
  isOpen,
  onClose,
  formData,
  onChange,
  onSubmit,
  onImageUpload,
}) => {
  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImageUpload(file);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <h3 className="text-xl font-semibold text-blue-700 mb-4 text-center">Introduction</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.firstName}
            onChange={(e) => onChange({ ...formData, firstName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.lastName}
            onChange={(e) => onChange({ ...formData, lastName: e.target.value })}
          />
          <input
            type="date"
            placeholder="Date of Birth"
            className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.birthDate}
            onChange={(e) => onChange({ ...formData, birthDate: e.target.value })}
          />
          <textarea
            placeholder="About You"
            className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            value={formData.summary}
            onChange={(e) => onChange({ ...formData, summary: e.target.value })}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

export default IntroductionModal;
