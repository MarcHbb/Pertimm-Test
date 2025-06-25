import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import { registerUser } from '../../api/api';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const disableButton = !email || !password || !confirmPassword || isLoading;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setIsLoading(true);
    registerUser(email, password, handleUserRegistered, onError);
  };

  const handleUserRegistered = (token: string, email: string) => {
    setIsLoading(false);
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    navigate('/home');
  };

  const onError = (error: string) => {
    setIsLoading(false);
    setError(error);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded bg-white p-8 shadow-md"
      >
        <h2 className="mb-6 text-center text-2xl font-bold">Register</h2>

        <div className="mb-4 text-center">
          <span className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={() => navigate('/login')}
            >
              Log in
            </button>
          </span>
        </div>
        {error && (
          <div className="mb-4 text-center text-sm text-red-500">{error}</div>
        )}
        <div className="mb-4">
          <label className="mb-1 block font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div className="mb-4">
          <label className="mb-1 block font-medium" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        <div className="mb-6">
          <label className="mb-1 block font-medium" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        <button
          disabled={disableButton}
          type="submit"
          className="w-full rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700"
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
