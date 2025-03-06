import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ForgotPassword.css'
import banner from './PitchSuiteBanner.png'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    try {
      const response = await fetch('http://localhost:3001/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (response.ok) {
        const data = await response.json()
        setMessage(data.message || 'A password reset email has been sent.')
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to send reset email. Please try again.')
      }
    } catch (error) {
      console.error('Error during password reset:', error)
      setError('Error during password reset. Please try again later.')
    }
  }

  const handleBackToLogin = () => {
    navigate('/login')
  }

  return (
    <div className='forgot-password-page'>
      <div className='banner'>
        <img src={banner} alt='PitchSuite Banner' className='banner-image' />
      </div>

      <div className='forgot-password-box'>
        <h2>Reset Your Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder='Enter your email'
            className='input-field'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type='submit' className='reset-button'>Reset Password</button>
        </form>
        {message && <p className='success-message'>{message}</p>}
        {error && <p className='error-message'>{error}</p>}
        <button onClick={handleBackToLogin} className='back-button'>Back to Login</button>
      </div>
    </div>
  )
}

export default ForgotPassword
