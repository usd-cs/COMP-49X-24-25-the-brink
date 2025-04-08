import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Loginpage.css'
import banner from './PitchSuiteBanner.png'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSignUpClick = () => {
    navigate('/signup')
  }

  const handleHomeClick = () => {
    navigate('/')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('authToken', data.token)
        localStorage.setItem('userName', data.first_name)
        localStorage.setItem('userEmail', data.email)
        localStorage.setItem('userRole', data.role) // <-- Add this line
        navigate('/dashboard')
      } else {
        const errorData = await response.json()
        setErrorMessage(errorData.error || 'Login failed. Please check your credentials.')
      }
    } catch (error) {
      console.error('Error during login:', error)
      setErrorMessage('Error during login. Please try again later.')
    }
  }

  return (
    <div className='login-page'>
      <div className='banner'>
        <img src={banner} alt='PitchSuite Banner' className='banner-image' />
      </div>

      <div className='login-box'>
        <h2>Welcome to PitchSuite</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type='email' 
            placeholder='Email' 
            className='input-field'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type='password' 
            placeholder='Password' 
            className='input-field'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit' className='login-button'>Login</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p className='signup-link'>
          <span onClick={handleSignUpClick} className='link-text'>No Account? Click here to Sign Up</span>
        </p>
        <button onClick={handleHomeClick} className='home-button' aria-label='Home'>Home</button>
      </div>
    </div>
  )
}

export default Login
