import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css';
import banner from './PitchSuiteBanner.png';

const Login = () => {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate('/login')
    }
    
    return(
        <div className = 'sign-up-page'>

            <div className ="banner">
                <img src={banner} alt="PitchSuite Banner" className="banner-image"/>
            </div>


            <div className="sign-up-box">
                <h2>Welcome to PitchSuite</h2>
                <form>
                    <input type='email' placeholder="Email" className ="input-field" /> 
                    <input type='password' placeholder= "Password" className="input-field"/>
                    <button type="submit" className="sign-up-button"> Sign Up</button>
                </form>
                <p className ="login-link">
                    <span onClick={handleLoginClick} className='link-text'>Login</span>
                </p>
            </div>
        </div>
    );
};

export default Login;