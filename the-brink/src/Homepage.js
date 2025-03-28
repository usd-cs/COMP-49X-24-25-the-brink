import React from 'react';
import './Homepage.css';
import banner from './PitchSuiteBanner.png';



const Header = () => {
  return (
    <header className="header">
      <img src={banner} alt="PitchSuite Banner" className="banner" />
    </header>
  );
};

const About = () => {
  return (
    <section className="about">
      <h2 className='section-title'>About Us</h2>
      <p className='section-text'>The Brink SBDC provides free and confidential 1:1 advising and training to students and the community to help innovative founders in tech and life sciences access capital to build investable companies to make economic impact.

Our business assistance results in economic growth and prosperity for the region while attaining the “5 P’s” of sustainable development: profit, people, planet, peace, and prosperity
We are one of only a handful of its kind in the country and are ranked #1 by San Diego Business Journal Business Incubators and Accelerators.
Our clients reached over $515 M in capital raised since inception!</p>
    </section>
  );
};

const ApplyButton = () => {
  return <button className="apply-button">Apply Now!</button>;
};

const Partners = () => {
  return (
    <section className="partners">
      <h2 className="section-title">Our Partners</h2>
      <p className='section-text'>Funded in part through a Cooperative Agreement with the U.S. Small Business Administration.
Funded in part through a Grant with the California Office of the Small Business Advocate; all opinions, conclusions, and/or recommendations expressed herein are those of the author(s) and do not necessarily reflect the views of the California Office of the Small Business Advocate.
The Accelerate California: Innovation Hub Program (Accelerate CA) is funded by the State of California and administered by the California Office of the Small Business Advocate (CalOSBA).</p>
      <ApplyButton />
    </section>
  );
};

const Homepage = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <About />
        <Partners />
       </main>
      </div>

  );
};

export default Homepage;