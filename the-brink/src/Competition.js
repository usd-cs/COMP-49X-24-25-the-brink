import React from 'react';
import {useNavigate} from 'react-router-dom';
import './Competition.css';
import banner from  "/Users/maevetierney/Documents/COMP-49X-24-25-the-brink/the-brink/src/PitchSuiteBanner.png";
import aceLogo from '/Users/maevetierney/Documents/COMP-49X-24-25-the-brink/the-brink/src/aceCircleLogo.png';
import usdLogo from "/Users/maevetierney/Documents/COMP-49X-24-25-the-brink/the-brink/src/usd-logo.png";
import socialLogo from "/Users/maevetierney/Documents/COMP-49X-24-25-the-brink/the-brink/src/SocialInnovationCircleLogo.png";
import techLogo from "/Users/maevetierney/Documents/COMP-49X-24-25-the-brink/the-brink/src/techCircleLogo.png";


const competitionData= [
    {
        logo: aceLogo,
        title: 'Accelerate California Entrepeneurship Pitch Competition',
        route: '/ace-apply',
    },
    {
        logo: usdLogo,
        title: 'Fowler Business Concept Challenge',
    },
    {
        logo: socialLogo,
        title: 'Fowler Global Social Innovation Challenge',
    },
    {
        logo: techLogo,
        title: 'Torero Entrepeneurship Challenge',
    },
];

const Competitions = () => {

    const navigate = useNavigate();
    const handleApplyNowClick = (route) => {
        navigate(route);
    };


    return(
        <div className='competitions'>

            <div className="banner">
                <img src={banner} alt="banner" className='banner-image' />
            </div>


            <h2>Competitions</h2>
            <div className = 'competitions-grid'>
                {competitionData.map((competition, index) => (
                    <div className ='competition-card' key={index}>
                        <img src={competition.logo} alt={'logo'} className="competition-logo" />
                        
                        <div className="competition-info">
                            <h3>{competition.title}</h3>
                            <button 
                                className='apply-now-button'
                                onClick={() => handleApplyNowClick(competition.route)}
                            >Apply Now</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Competitions;


