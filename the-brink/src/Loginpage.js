// src/Loginpage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Loginpage.css';
import banner from './PitchSuiteBanner.png';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUpClick = () => navigate('/signup');
  const handleForgotPasswordClick = () => navigate('/forgot-password');
  const handleHomeClick = () => navigate('/');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL || ''}/api/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Login failed');
      }

      const data = await res.json();
      // store the JWT
      localStorage.setItem('authToken', data.token);
      // make email available for sidebar fetch
      localStorage.setItem('userEmail', data.email);

      // inform AuthContext
      login({
        id: data.id,
        role: data.role,
        firstName: data.first_name,
        email: data.email
      });

      // go to profile or dashboard
      navigate('/profile', { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage(err.message);
    }
  };

  return (
    <div className='login-page'>
      <div className='logo-banner'>
        <img src={banner} alt='PitchSuite Banner' />
      </div>

      <div className='login-box'>
        <h2>Welcome to PitchSuite</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder='Email'
            className='input-field'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type='password'
            placeholder='Password'
            className='input-field'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type='submit' className='login-button'>
            Login
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p className='signup-link'>
          <span onClick={handleSignUpClick} className='link-text'>
            No Account? Click here to Sign Up
          </span>
        </p>
        <p className='forgot-password-link'>
          <span onClick={handleForgotPasswordClick} className='link-text'>
            Forgot Password? Click here to reset
          </span>
        </p>

        <button onClick={handleHomeClick} className='home-button' aria-label='Home'>
          Home
        </button>
      </div>
    </div>
  );
};

export default Login;

