// src/Homepage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';
import banner from './PitchSuiteBanner.png';

// import your local icon assets
import facebookIcon  from './assets/facebook.svg';
import twitterIcon   from './assets/twitter.svg';
import linkedinIcon  from './assets/linkedin.svg';
import instagramIcon from './assets/instagram.svg';
import youtubeIcon   from './assets/youtube.svg';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      {/* Full-width banner */}
      <div className="logo-banner">
        <img src={banner} alt="PitchSuite Banner" />
      </div>

      <main className="main-content">
        <section className="about">
          <h2 className="section-title">About Us</h2>
          <p className="section-text">
            The Brink SBDC provides free and confidential 1:1 advising and training to students and the community to help innovative founders in tech and life sciences access capital to build investable companies to make economic impact.
            <br /><br />
            Our business assistance results in economic growth and prosperity for the region while attaining the “5 P’s” of sustainable development: profit, people, planet, peace, and prosperity.
            <br /><br />
            We are one of only a handful of its kind in the country and are ranked #1 by San Diego Business Journal Business Incubators and Accelerators.
            <br />
            Our clients reached over $515 M in capital raised since inception!
          </p>
        </section>

        <section className="partners">
          <h2 className="section-title">Our Partners</h2>
          <p className="section-text">
            Funded in part through a Cooperative Agreement with the U.S. Small Business Administration.
            <br /><br />
            Funded in part through a Grant with the California Office of the Small Business Advocate; all opinions, conclusions, and/or recommendations expressed herein are those of the author(s) and do not necessarily reflect the views of the California Office of the Small Business Advocate.
            <br /><br />
            The Accelerate California: Innovation Hub Program (Accelerate CA) is funded by the State of California and administered by the California Office of the Small Business Advocate (CalOSBA).
          </p>
          <button
            className="apply-button"
            onClick={() => navigate('/competitions')}
          >
            Apply Now!
          </button>
        </section>
      </main>

      {/* Social media links */}
      <footer className="social-media">
        <a href="https://www.facebook.com/theBrinkSBDC" target="_blank" rel="noopener noreferrer">
          <img src={facebookIcon}  alt="Facebook" />
        </a>
        <a href="https://twitter.com/TheBrinkSbdc"  target="_blank" rel="noopener noreferrer">
          <img src={twitterIcon}   alt="Twitter" />
        </a>
        <a href="https://www.linkedin.com/company/the-brink-sbdc/" target="_blank" rel="noopener noreferrer">
          <img src={linkedinIcon}  alt="LinkedIn" />
        </a>
        <a href="https://www.instagram.com/thebrinksbdc/" target="_blank" rel="noopener noreferrer">
          <img src={instagramIcon} alt="Instagram" />
        </a>
        <a href="https://www.youtube.com/@TheBrinkSBDC" target="_blank" rel="noopener noreferrer">
          <img src={youtubeIcon}   alt="YouTube" />
        </a>
      </footer>
    </div>
  );
};

export default Homepage;

