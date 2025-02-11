import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Competition.css'

// Corrected relative paths
import banner from './PitchSuiteBanner.png'
import aceLogo from './aceCircleLogo.png'
import usdLogo from './usd-logo.png'
import socialLogo from './SocialInnovationCircleLogo.png'
import techLogo from './techCircleLogo.png'

const competitionData = [
  {
    logo: aceLogo,
    title: 'Accelerate California Entrepeneurship Pitch Competition',
    route: '/ace-apply'
  },
  {
    logo: usdLogo,
    title: 'Fowler Business Concept Challenge'
  },
  {
    logo: socialLogo,
    title: 'Fowler Global Social Innovation Challenge'
  },
  {
    logo: techLogo,
    title: 'Torero Entrepeneurship Challenge'
  }
]

const Competitions = () => {
  const navigate = useNavigate()

  const handleApplyNowClick = (route) => {
    navigate(route)
  }

  const handleLoginClick = () => {
    navigate('/login')
  }

  return (
    <div className='competitions'>

      <div className='banner'>
        <img src={banner} alt='banner' className='banner-image' />
      </div>

      <h2>Competitions</h2>
      <div className='competitions-grid'>
        {competitionData.map((competition, index) => (
          <div className='competition-card' key={index}>
            <img src={competition.logo} alt='logo' className='competition-logo' />

            <div className='competition-info'>
              <h3>{competition.title}</h3>
              <button
                className='apply-now-button'
                onClick={() => handleApplyNowClick(competition.route)}
              >Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleLoginClick} className='login-button'>Login</button>
    </div>
  )
}

export default Competitions
