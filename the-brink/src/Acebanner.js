import React from 'react';
import logo from './ace-pitch-competition-banner.png'
import './Acebanner.css'

const Acebanner = () => {
    return (
        <div className="header-container">
            <div className="blue-bars">
                <div className="dark-blue-bar"></div>
                <div className="light-blue-bar"></div>
            </div>
            <img src={logo} alt="PS Banner" className="logo"/>
        
            
        </div>
    );
};
export default Acebanner; 