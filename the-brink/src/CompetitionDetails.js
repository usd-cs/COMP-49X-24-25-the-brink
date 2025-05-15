// CompetitionDetails.js
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './CompetitionDetails.css'
import AceLogo from './aceCircleLogo.png'

const CompetitionDetails = () => {
  const navigate = useNavigate()

  const toCompetition = () => {
    navigate('/ace-apply') // Redirect to the application form
  }

  const goToCompetitionsPage = () => {
    navigate('/competitions') // Redirect back to competitions list
  }

  return (
    <div className='competition-details'>
      {/* Left Column: Competition Information */}
      <div className='details-column'>
        <div className='section-header'>
          <h2>Background Information</h2>
        </div>
        <div className='details-text'>
          <p>
            The ACE Pitch Competition, hosted by The Brink SBDC in partnership with Connect and the Stella Foundation, 
            launched on August 27, 2024 at the University of San Diego’s Knauss School of Business. Twelve 
            pre-selected startups delivered three-minute pitches on stage for a chance to win up to 
            <strong> $100,000</strong> in non-dilutive grant funding.
          </p>
        </div>

        <div className='section-header'>
          <h2>Requirements</h2>
        </div>
        <div className='details-text'>
          <ul>
            <li>Open to early-stage, California-based startups in tech, life sciences, cleantech, and beyond.</li>
            <li>Must apply via The Brink SBDC portal and be selected as one of the 12 finalists.</li>
            <li>Deliver a concise, three-minute pitch using a provided slide deck template.</li>
            <li>Attend both the preliminary session (Aug 27) and the finale at Innovation Day.</li>
          </ul>
        </div>

        <div className='section-header'>
          <h2>Important Information</h2>
        </div>
        <div className='details-text'>
          <p><strong>Application Deadline:</strong> July 15, 2024</p>
          <p><strong>Preliminary Pitch Session:</strong> August 27, 2024 @ USD Knauss School</p>
          <p><strong>Finale:</strong> Innovation Day @ Gallagher Square, San Diego Padres Park</p>
          <p><strong>Award:</strong> Non-dilutive grants of up to \$100,000 announced live after the finale.</p>
        </div>

        <button onClick={goToCompetitionsPage} className='home-button' aria-label='Back to Competitions'>
          ← Back to Competitions
        </button>
      </div>

      {/* Right Column: Logo & Apply Button */}
      <div className='logo-column'>
        <img className='logo' src={AceLogo} alt='ACE Pitch Competition Logo' />
        <button type='button' onClick={toCompetition} className='apply-button'>
          Apply Here!
        </button>
      </div>
    </div>
  )
}

export default CompetitionDetails

