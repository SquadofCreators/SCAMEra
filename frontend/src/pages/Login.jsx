import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../assets/logo.png';
import Logo_2 from '../assets/logo-3.svg';

import { IoMdEye, IoMdEyeOff } from "react-icons/io";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const validUsername = import.meta.env.VITE_APP_USERNAME;
    const validPassword = import.meta.env.VITE_APP_PASSWORD;

    if (username === validUsername && password === validPassword) {
      login(); 
      navigate('/'); 
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-dvh px-6 bg-gray-900 text-white select-none">
      <div className='w-max p-2 flex items-center justify-center bg-gray-800 border-8 border-gray-900 rounded-full translate-y-2/4'>
        <img 
          src={Logo} 
          alt="" 
          className="w-16 h-16 mx-auto p-2"
        />
      </div>

      <div className="bg-gray-800 p-6 rounded-2xl w-full max-w-sm flex flex-col justify-center shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 mt-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 mt-1 bg-gray-700 text-white rounded"
              required
            />
          </div>

          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 bg-gray-700 text-white rounded"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-4/7 text-gray-500 hover:text-gray-300"
            >
              {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer"
          >
            Login
          </button>

          <Link 
            to="https://squadofcreators.github.io/SquadofCreators/"
            target='_blank'
            className='text-center mt-6 flex items-center justify-center gap-2 cursor-pointer'
          >
            <img src={Logo_2} alt="SoC Logo" className="w-3 h-3 mt-0.5 grayscale-100 brightness-150 contrast-20" />
            <p className='text-gray-400/70 text-xs'>powered by Squad of Creators</p>
          </Link>
        </form>
      </div>

      <div className="flex flex-col items-start justify-center mt-8">
        <h2 className="text-2xl font-semibold mb-4 underline">Demo Credentials</h2>
        <p className="text-lg flex items-start justify-between gap-2">Username: <span className='text-blue-500'>{import.meta.env.VITE_APP_USERNAME}</span></p>
        <p className="text-lg flex items-start justify-between gap-2">Password: <span className='text-blue-500'>{import.meta.env.VITE_APP_PASSWORD}</span></p>
      </div>
    </div>
  );
}

export default Login;
