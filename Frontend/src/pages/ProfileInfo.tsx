import React, { useState, useEffect } from 'react';
import { Pencil, User } from 'lucide-react';
import EducationModal from '../components/EducationModal';
import IntroductionModal from '../components/IntroductionModal';
import ProfessionalModal from '../components/ProfessionalModal';
import ExperienceModal from '../components/ExperienceModal';
import {jwtDecode} from 'jwt-decode';

// Types for profile data
interface Education {
  institute: string;
  degreeName?: string;
  startDate?: string;
  endDate?: string;
  course?: string;
  present?: boolean;
}

interface Professional {
  barCouncilNumber?: string;
  practiceArea?: string;
  extraCertificates?: string;
  languages?: string;
}

interface Experience {
  companyName: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  present?: boolean;
}

interface ProfileData {
  firstname: string;
  lastname: string;
  summary: string;
  birthDate?: string;
  profilePic?: string;
  education: Education[];
  professional: Professional[];
  experience: Experience[];
}

const ProfileInfo: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const authToken = localStorage.getItem('authToken');

  // Decode the token to get user ID
  useEffect(() => {
    if (authToken) {
      if (authToken.split('.').length !== 3) {
        console.error('Stored auth token is invalid or malformed');
        return;
      }
      try {
        const decodedToken: any = jwtDecode(authToken);
        console.log('Decoded Token:', decodedToken);
        setUserId(decodedToken.id);
      } catch (err) {
        console.error('Failed to decode token:', err);
      }
    } else {
      console.error('Auth token is not present in localStorage');
    }
  }, [authToken]);

  // Profile state now holds first and last name separately
  const [profileData, setProfileData] = useState<ProfileData>({
    firstname: '',
    lastname: '',
    summary: '',
    profilePic: '',
    education: [],
    professional: [],
    experience: [],
  });

  // Modal states
  const [showIntroModal, setShowIntroModal] = useState(false);
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [showProfessionalModal, setShowProfessionalModal] = useState(false);
  const [showExperienceModal, setShowExperienceModal] = useState(false);

  // Form state for Introduction
  const [introForm, setIntroForm] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    summary: '',
    profilePic: '',
  });

  const [educationForm, setEducationForm] = useState<Education>({
    institute: '',
    degreeName: '',
    startDate: '',
    endDate: '',
    course: '',
    present: false,
  });

  const [professionalForm, setProfessionalForm] = useState<Professional>({
    barCouncilNumber: '',
    practiceArea: '',
    extraCertificates: '',
    languages: '',
  });

  const [experienceForm, setExperienceForm] = useState<Experience>({
    companyName: '',
    role: '',
    startDate: '',
    endDate: '',
    description: '',
    present: false,
  });

  // Fetch profile data when userId is set
  useEffect(() => {
    const loadProfileData = async () => {
      if (!userId) {
        console.error('User ID is missing');
        return;
      }
      try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        console.log('Profile data fetched:', data);
        setProfileData(data);
      } catch (err) {
        console.error('Failed to fetch profile data:', err);
      }
    };

    if (userId) {
      loadProfileData();
    }
  }, [userId, authToken]);

  // Handle intro form submission using fetch
  const handleIntroSubmit = async () => {
    try {
      // Map form keys to schema keys
      const payload = {
        firstname: introForm.firstName, 
        lastname: introForm.lastName,  
        birthDate: introForm.birthDate,
        summary: introForm.summary,
        profilePic: introForm.profilePic,
      };
  
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update introduction');
      }
  
      const result = await response.json();
      console.log('Intro update response:', result);
  
      // Update local state to reflect the changes
      setProfileData((prev) => ({
        ...prev,
        firstname: introForm.firstName,
        lastname: introForm.lastName,
        birthDate: introForm.birthDate,
        summary: introForm.summary,
        profilePic: introForm.profilePic,
      }));
  
      setShowIntroModal(false);
    } catch (err) {
      console.error('Failed to save intro:', err);
    }
  };
  

  const handleEducationSubmit = async () => {
    const newEducation = { ...educationForm };
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          education: [...(profileData.education || []), newEducation],
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update education');
      }
      const result = await response.json();
      console.log('Education update response:', result);
      setProfileData((prev) => ({
        ...prev,
        education: [...(prev.education || []), newEducation],
      }));
      setShowEducationModal(false);
    } catch (err) {
      console.error('Failed to save education:', err);
    }
  };

  const handleProfessionalSubmit = async () => {
    const newProfessional = { ...professionalForm };
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ professional: [newProfessional] }),
      });
      if (!response.ok) {
        throw new Error('Failed to update professional info');
      }
      const result = await response.json();
      console.log('Professional update response:', result);
      setProfileData((prev) => ({
        ...prev,
        professional: [newProfessional],
      }));
      setShowProfessionalModal(false);
    } catch (err) {
      console.error('Failed to save professional info:', err);
    }
  };
  

  const handleExperienceSubmit = async () => {
    const newExperience = { ...experienceForm };
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          experience: [...(profileData.experience || []), newExperience],
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update experience');
      }
      const result = await response.json();
      console.log('Experience update response:', result);
      setProfileData((prev) => ({
        ...prev,
        experience: [...(prev.experience || []), newExperience],
      }));
      setShowExperienceModal(false);
    } catch (err) {
      console.error('Failed to save experience:', err);
    }
  };

  // Handle image upload using fetch with FormData
  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch(`http://localhost:5000/api/upload/${userId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${authToken}` },
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Image upload failed');
      }
      const result = await response.json();
      if (!result.url) {
        throw new Error('Image upload failed');
      }
      // Update UI optimistically
      setProfileData((prev) => ({ ...prev, profilePic: result.url }));
      await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profilePic: result.url }),
      });
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 p-4 pt-24 px-24">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left sidebar */}
        <div className="w-full md:w-1/5 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex flex-col items-center mb-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-2">
              <User className="text-white" size={32} />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-blue-600 py-1 border-b">
              <span>Introduction</span>
              <button onClick={() => setShowIntroModal(true)} className="text-blue-500">
                <Pencil size={16} />
              </button>
            </div>
            <div className="flex justify-between items-center text-blue-600 py-1 border-b">
              <span>Education</span>
              <button onClick={() => setShowEducationModal(true)} className="text-blue-500">
                <Pencil size={16} />
              </button>
            </div>
            <div className="flex justify-between items-center text-blue-600 py-1 border-b">
              <span>Professional</span>
              <button onClick={() => setShowProfessionalModal(true)} className="text-blue-500">
                <Pencil size={16} />
              </button>
            </div>
            <div className="flex justify-between items-center text-blue-600 py-1 border-b">
              <span>Experience</span>
              <button onClick={() => setShowExperienceModal(true)} className="text-blue-500">
                <Pencil size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="w-full md:w-4/5 space-y-4">
          {/* Profile section */}
          <div className="bg-white p-6 rounded-lg shadow-sm relative">
            <button
              onClick={() => setShowIntroModal(true)}
              className="absolute top-4 right-4 text-blue-500"
            >
              <Pencil size={18} />
            </button>
            <div className="flex flex-col items-center">
              {profileData.profilePic ? (
                <img
                  src={profileData.profilePic}
                  alt={`${profileData.firstname} ${profileData.lastname}`}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
              ) : (
                <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                  <User className="text-white" size={40} />
                </div>
              )}
              <h2 className="text-xl font-semibold text-blue-700 mb-2">
                {profileData.firstname || 'First Name'} {profileData.lastname || 'Last Name'}
              </h2>
              <p className="text-center text-gray-600 max-w-2xl">
                {profileData.summary || 'About'}
              </p>
            </div>
          </div>

          {/* Education section */}
          <div className="bg-white p-6 rounded-lg shadow-sm relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-blue-700">Education</h3>
              <button onClick={() => setShowEducationModal(true)} className="text-blue-500">
                <Pencil size={18} />
              </button>
            </div>
            {profileData.education.length > 0 ? (
              <div className="space-y-4 text-lg">
                {profileData.education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-blue-700">Institute Name : {edu.institute}</h4>
                    <p className="text-sm text-gray-600">Degree Name : {edu.deblueame}</p>
                    <p className="text-xs text-gray-500">
                      Duration : {edu.startDate} - {edu.present ? 'Present' : edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                No education information added yet
              </div>
            )}
          </div>

          {/* Professional section */}
          <div className="bg-white p-6 rounded-lg shadow-sm relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-blue-700">Professional</h3>
              <button onClick={() => setShowProfessionalModal(true)} className="text-blue-500">
                <Pencil size={18} />
              </button>
            </div>
            {profileData.professional.length > 0 ? (
              <div className="space-y-4 text-lg">
                {profileData.professional.map((prof, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    {prof.barCouncilNumber && (
                      <p className="text-sm text-gray-600">
                        Bar Council Number : {prof.barCouncilNumber}
                      </p>
                    )}
                    {prof.practiceArea && (
                      <p className="text-sm text-gray-600">
                        Practice Area : {prof.practiceArea}
                      </p>
                    )}
                    {prof.extraCertificates && (
                      <p className="text-sm text-gray-600">
                        Extra Certificates : {prof.extraCertificates}
                      </p>
                    )}
                    {prof.languages && (
                      <p className="text-sm text-gray-600">
                        Languages Known : {prof.languages}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                No professional information added yet
              </div>
            )}
          </div>

          {/* Experience section */}
          <div className="bg-white p-6 rounded-lg shadow-sm relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-blue-700">Experience</h3>
              <button onClick={() => setShowExperienceModal(true)} className="text-blue-500">
                <Pencil size={18} />
              </button>
            </div>
            {profileData.experience.length > 0 ? (
              <div className="space-y-4 text-lg">
                {profileData.experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-blue-700">Company Name: {exp.companyName}</h4>
                    <p className="text-sm text-gray-600">Role : {exp.role}</p>
                    <p className="text-xs text-gray-500">
                    Duration : {exp.startDate} - {exp.present ? 'Present' : exp.endDate}
                    </p>
                    <p className="text-sm text-gray-600">Description : {exp.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                No experience information added yet
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <IntroductionModal
        isOpen={showIntroModal}
        onClose={() => setShowIntroModal(false)}
        formData={introForm}
        onChange={setIntroForm}
        onSubmit={handleIntroSubmit}
        onImageUpload={handleImageUpload}
      />
      <EducationModal
        isOpen={showEducationModal}
        onClose={() => setShowEducationModal(false)}
        formData={educationForm}
        onChange={setEducationForm}
        onSubmit={handleEducationSubmit}
      />
      <ProfessionalModal
        isOpen={showProfessionalModal}
        onClose={() => setShowProfessionalModal(false)}
        formData={professionalForm}
        onChange={setProfessionalForm}
        onSubmit={handleProfessionalSubmit}
      />
      <ExperienceModal
        isOpen={showExperienceModal}
        onClose={() => setShowExperienceModal(false)}
        formData={experienceForm}
        onChange={setExperienceForm}
        onSubmit={handleExperienceSubmit}
      />
    </div>
  );
};

export default ProfileInfo;
