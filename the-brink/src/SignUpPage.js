import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SignUpPage.css'
import banner from './PitchSuiteBanner.png'

const SignUpPage = () => {
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [emailValid, setEmailValid] = useState(false)

  // Basic email validation regex
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleEmailChange = (e) => {
    const newEmail = e.target.value
    setEmail(newEmail)
    setEmailValid(validateEmail(newEmail))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!emailValid) {
      alert("Please enter a valid email address")
      return
    }
    
    // Validate phone number: exactly 10 digits 
    const phoneRegex = /^\d{10}$/
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid 10-digit phone number.")
      return
    }
    
    // Send a POST request to the signup endpoint
    try {
      const response = await fetch('http://localhost:3001/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password, phone })
      })      

      if (response.ok) {
        alert("Sign up successful!")
        navigate('/login')
      } else {
        const errorData = await response.json()
        alert(errorData.error || "Sign up failed")
      }
    } catch (error) {
      console.error("Error during sign up:", error)
      alert("Error during sign up")
    }
  }

  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleHomeClick = () => {
    navigate('/')
  }

  return (
    <div className='sign-up-page'>
      <div className='banner'>
        <img src={banner} alt='PitchSuite Banner' className='banner-image' />
      </div>

      <div className='sign-up-box'>
        <h2>Welcome to PitchSuite</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type='text' 
            placeholder='First Name' 
            className='input-field'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input 
            type='text' 
            placeholder='Last Name' 
            className='input-field'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input 
            type='email' 
            placeholder='Email' 
            className='input-field'
            value={email}
            onChange={handleEmailChange}
          />
          <input 
            type='password' 
            placeholder='Password' 
            className='input-field'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input 
            type='tel' 
            placeholder='Phone Number (10 digits)' 
            className='input-field'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            pattern="\d{10}"
            title="Please enter exactly 10 digits"
            required
          />
          <button 
            type='submit' 
            className='sign-up-button'
            disabled={!emailValid}
          >
            Sign Up
          </button>
        </form>
        <p className='login-link'>
          <span onClick={handleLoginClick} className='link-text'>Login</span>
        </p>
        <button onClick={handleHomeClick} className='home-button' aria-label='Home'>
          Home
        </button>
      </div>
    </div>
  )
}

export default SignUpPage
