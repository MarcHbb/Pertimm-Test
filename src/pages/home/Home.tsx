import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/apiConfig';
import { confirmApplication, pollConfirmedStatus } from '../../api/api';

const Home = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const disableButton = !firstName || !lastName || isLoading;

  useEffect(() => {
    const storedEmail = localStorage.getItem('email') || '';
    setEmail(storedEmail);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    if (!firstName || !lastName) {
      setError('First name and last name are required.');
      setIsLoading(false);
      return;
    }

    handleJobApplication();
  };

  const handleJobApplication = async () => {
    try {
      const response = await axiosInstance.post(
        '/api/v1.1/job-application-request/',
        {
          email,
          first_name: firstName,
          last_name: lastName,
        }
      );

      if (response.status === 201) {
        setIsConfirming(true);
        pollConfirmedStatus(
          response.data.url,
          handleConfirmedStatus,
          handleError
        );
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmedStatus = (confirmationUrl: string) => {
    confirmApplication(confirmationUrl, handleConfirmApplication, handleError);
  };

  const handleConfirmApplication = () => {
    setIsConfirming(false);
    alert('Application confirmed successfully!');
  };

  const handleError = (error: string) => {
    setError(error);
    setIsConfirming(false);
    throw new Error(error);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Welcome to the Home Page
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="mb-4 text-center text-sm text-red-500">{error}</div>
          )}
          <div>
            <label className="mb-1 block text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 text-gray-700"
            />
          </div>
          <div>
            <label className="mb-1 block text-gray-700">First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="mb-1 block text-gray-700">Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>
          <button
            disabled={disableButton}
            type="submit"
            className="w-full rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700"
          >
            {isLoading
              ? 'Submitting...'
              : isConfirming
                ? 'Confirming...'
                : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
