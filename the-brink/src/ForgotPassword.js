import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import './Loginpage.css'
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
        const err = await response.json().catch(() => ({}))
        throw new Error(err.error || 'Request failed.')
      }
      const { name, resetLink } = await response.json()

      // let emailjs know
      await emailjs.send(
        'service_4whkesk',
        'template_cndhr08',
        { name, reset_link: resetLink, time: new Date().toLocaleString(), user_email: email },
        '3jd-GlP1F4V8LGQdC'
      )

      setNotification('If this email is registered, a reset link has been sent.')

    } catch (err) {
      console.error(err)
      setErrorMessage('Error processing request. Please try again.')
    }
  }

  return (
    <div className='login-page'>
      <div className='banner'>
        <img src={banner} alt='Banner' className='banner-image' />
      </div>
      <div className='login-box'>
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder='Enter your email'
            className='input-field'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button type='submit' className='login-button'>Submit</button>
        </form>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
        {notification && <p className='notification-message'>{notification}</p>}
        <button onClick={() => navigate('/login')} className='secondary-button'>
          Back to Login
        </button>
      </div>
    </div>
  )
}

export default ForgotPassword

