import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Loginpage.css'
import banner from './PitchSuiteBanner.png'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [notification, setNotification] = useState('')

  const validateEmail = (email) => {
    // Basic email validation regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setNotification('')

    if (!email || !validateEmail(email)) {
      setErrorMessage('Please enter a valid email.')
      return
    }

    try {
      const response = await fetch('http://localhost:3001/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (response.ok) {
        const data = await response.json()
        setNotification(data.message || 'If this email is registered, you will receive a password reset link shortly.')
      } else {
        const errorData = await response.json()
        setErrorMessage(errorData.error || 'Failed to process the request.')
      }
    } catch (error) {
      console.error('Error sending forgot password request:', error)
      setErrorMessage('There was an error processing your request. Please try again later.')
    }
  }

  const handleBackToLogin = () => {
    navigate('/login')
  }

  return (
    <div className='login-page'>
      <div className='banner'>
        <img src={banner} alt='PitchSuite Banner' className='banner-image' />
      </div>

      <div className='login-box'>
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type='email' 
            placeholder='Enter your email'
            className='input-field'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type='submit' className='login-button'>Submit</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {notification && <p className="notification-message">{notification}</p>}
        <button onClick={handleBackToLogin} className='login-button'>Back to Login</button>
      </div>
    </div>
  )
}

export default ForgotPassword
