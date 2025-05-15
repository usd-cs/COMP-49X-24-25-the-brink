// === Competition.js ===

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Competition.css';

// Import the same full-width banner image
import banner from './PitchSuiteBanner.png';

// Competition logos
import aceLogo from './aceCircleLogo.png';
import usdLogo from './usd-logo.png';
import socialLogo from './SocialInnovationCircleLogo.png';
import techLogo from './techCircleLogo.png';

const competitionData = [
  {
    logo: aceLogo,
    title: 'Accelerate California Entrepreneurship Pitch Competition',
    route: '/ace-details'
  },
  {
    logo: usdLogo,
    title: 'Fowler Business Concept Challenge',
    route: '/competitions'
  },
  {
    logo: socialLogo,
    title: 'Fowler Global Social Innovation Challenge',
    route: '/competitions'
  },
  {
    logo: techLogo,
    title: 'Torero Entrepreneurship Challenge',
    route: '/competitions'
  }
];

const Competitions = () => {
  const navigate = useNavigate();

  return (
    <div className="competitions">
      {/* Full-width banner */}
      <div className="banner">
        <img src={banner} alt="PitchSuite Banner" className="banner-image" />
      </div>

      <h2>Competitions</h2>

      <div className="competitions-grid">
        {competitionData.map((competition, idx) => (
          <div className="competition-card" key={idx}>
            <img
              src={competition.logo}
              alt={`${competition.title} logo`}
              className="competition-logo"
            />
            <div className="competition-info">
              <h3>{competition.title}</h3>
              <button
                className="apply-now-button"
                onClick={() => navigate(competition.route)}
              >
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="login-button" onClick={() => navigate('/login')}>
        Login
      </button>
    </div>
  );
};

export default Competitions;

