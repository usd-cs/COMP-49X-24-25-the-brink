// src/pages/ResetPassword.js
import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const token = searchParams.get('token')
  const email = searchParams.get('email')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      const response = await fetch('http://localhost:3001/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token, newPassword })
      })

      const data = await response.json()
      if (response.ok) {
        setMessage('Password successfully reset.')
        setTimeout(() => navigate('/login'), 2000)
      } else {
        setError(data.error || 'Something went wrong.')
      }
    } catch (err) {
      setError('Server error')
    }
  }

  return (
    <div className='reset-container'>
      <h2>Reset Password</h2>
      {message && <p className='success'>{message}</p>}
      {error && <p className='error'>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type='password'
          placeholder='New password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Confirm password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type='submit'>Reset Password</button>
      </form>
    </div>
  )
}

export default ResetPassword
