import React from 'react'
import { useNavigate } from 'react-router-dom'
import './CompetitionDetails.css'
import AceLogo from './aceCircleLogo.png'

const CompetitionDetails = () => {
    const navigate = useNavigate()

    const toCompetition = () => {
        navigate('/ace-apply') // Redirect to the application
    }

    const goToCompetitionsPage = () => {
    navigate('/competitions') // Redirect to the home page
  }
    
  return (
      
        <div>
          <div className='left-screen'>
            <div className='section-header'>
                <p>Background Information</p>
            </div>
            <div className='details-text'>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
            <div className='section-header'>
                <p>Requirements</p>
            </div>
            <div className='details-text'>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
            </div>
            <div className='section-header'>
                <p>Important Information</p>
            </div>
            <div className='details-text'>
                <p>Application Due: October 1st, 2025</p>
                <p>Competition Date: October 15th, 2025</p>
                <p>Competition Location: Knauss School of Business</p>
                <p>Scoring Rubric: </p>
              </div>
              
              <button onClick={goToCompetitionsPage} className='home-button' aria-label='Competitions'>Back</button>
          </div> 

         <div className='right-screen'>
               <img className='logo' src={AceLogo} alt='Ace Pitch Competition Logo' />
               <button type='apply' onClick={toCompetition} className='apply-button'>Apply Here!</button>
          </div> 
          

      </div>
          )
}
export default CompetitionDetails
