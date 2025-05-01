// src/Loginpage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Loginpage.css';
import banner from './PitchSuiteBanner.png';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUpClick = () => navigate('/signup');
  const handleForgotPasswordClick = () => navigate('/forgot-password');
  const handleHomeClick = () => navigate('/');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Login failed');
      }
      const data = await res.json();
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userId', data.id);
      localStorage.setItem('userRole', data.role);
      const userObj = {
        id: data.id,
        role: data.role,
        firstName: data.first_name,
        email: data.email,
      };
      localStorage.setItem('user', JSON.stringify(userObj));
      login(userObj);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="app-container login-page">
      <header className="header">
        <img src={banner} alt="PitchSuite Banner" className="banner" />
      </header>

      <main className="main-content">
        <div className="form-container">
          <h2 className="section-title">Welcome to PitchSuite</h2>

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="input-field"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="apply-button">
              Login
            </button>
          </form>

          {errorMessage && <p className="section-text error-message">{errorMessage}</p>}

          <p className="section-text link-text" onClick={handleSignUpClick}>
            No Account? Sign Up
          </p>
          <p className="section-text link-text" onClick={handleForgotPasswordClick}>
            Forgot Password?
          </p>
          <button onClick={handleHomeClick} className="apply-button" style={{ marginTop: '20px' }}>
            Home
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;

