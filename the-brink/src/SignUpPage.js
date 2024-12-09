import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css';
import banner from '/Users/maevetierney/Documents/COMP-49X-24-25-the-brink/the-brink/src/PitchSuiteBanner.png';

const Login = () => {

    
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
            </div>
        </div>
    );
};

export default Login;