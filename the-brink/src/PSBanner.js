import React from 'react';
import logo from './PitchSuiteBanner.png'
import './PSBanner.css'

const PSBanner = () => {
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
export default PSBanner; 