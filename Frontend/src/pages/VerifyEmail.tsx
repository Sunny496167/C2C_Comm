import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';

const VerifyEmail = () => {
    const { confirmationCode } = useParams();
    const [message, setMessage] = useState('Verifying your email...');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { fetchData } = useApi();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                await fetchData(`/auth/confirm/${confirmationCode}`, 'GET');
                setMessage('Email verified successfully!');
                setTimeout(() => {
                    navigate('/login'); // Redirect to login after verification
                }, 3000);
            } catch {
                setError('Failed to verify email. Please try again.');
            }
        };

        verifyEmail();
    }, [confirmationCode, fetchData, navigate]);

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Email Verification
                </h2>
                {error ? (
                    <div className="text-red-500 text-center text-sm">
                        {error}
                    </div>
                ) : (
                    <div className="text-blue-500 text-center text-sm">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;