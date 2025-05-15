// ForgotPassword.js

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import './ForgotPassword.css'          // ← updated
import banner from './PitchSuiteBanner.png'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [notification, setNotification] = useState('')

  const validateEmail = (email) => {
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
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to process the request.')
      }

      const { name, resetLink } = await response.json()
      const templateParams = {
        name,
        reset_link: resetLink,
        time: new Date().toLocaleString(),
        user_email: email
      }

      await emailjs.send(
        'service_4whkesk',
        'template_cndhr08',
        templateParams,
        '3jd-GlP1F4V8LGQdC'
      )

      setNotification('If this email is registered, a password reset link has been sent.')
    } catch (error) {
      console.error('Error:', error)
      setErrorMessage('There was an error. Please try again later.')
    }
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
        <button onClick={() => navigate('/login')} className='login-button'>
          Back to Login
        </button>
      </div>
    </div>
  )
}

export default ForgotPassword

