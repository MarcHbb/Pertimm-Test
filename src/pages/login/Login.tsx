import React, { useState } from 'react';
import { loginUser } from '../../api/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const disableButton = !email || !password || isLoading;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    loginUser(email, password, handleUserLogged, onError);
  };

  const handleUserLogged = (token: string, email: string) => {
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
        className="w-full max-w-sm rounded bg-white p-8 shadow-md"
      >
        <h2 className="mb-6 text-center text-2xl font-bold">Login</h2>

        <div className="mb-4 text-center">
          <span className="text-gray-600">Don&apos;t have an account? </span>
          <a
            href="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Create one
          </a>
        </div>

        {error && (
          <div className="mb-4 text-center text-sm text-red-500">{error}</div>
        )}
        <div className="mb-4">
          <label className="mb-2 block text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <button
          disabled={disableButton}
          type="submit"
          className="w-full rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
