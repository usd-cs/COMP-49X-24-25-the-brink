import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Loginpage.css';
import banner from './PitchSuiteBanner.png';

const Login = () => {
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate('/signup'); // Navigate to the sign-up page
    };

    const handleHomeClick = () => {
        navigate('/'); // Navigate to the home page
    };

    return (
        <div className="login-page">
            <div className="banner">
                <img src={banner} alt="PitchSuite Banner" className="banner-image" />
            </div>

            <div className="login-box">
                <h2>Welcome to PitchSuite</h2>
                <form>
                    <input type="email" placeholder="Email" className="input-field" />
                    <input type="password" placeholder="Password" className="input-field" />
                    <button type="submit" className="login-button">Login</button>
                </form>
                <p className="signup-link">
                    <span onClick={handleSignUpClick} className="link-text">Sign Up</span>
                </p>
                <button onClick={handleHomeClick} className="home-button">Go to Home</button>
            </div>
        </div>
    );
};

export default Login;
