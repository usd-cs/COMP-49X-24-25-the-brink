import React from 'react'
import { useNavigate, Navigate } from 'react-router-dom'

const DashboardPage = () => {
  const token = localStorage.getItem('authToken')
  const userName = localStorage.getItem('userName')
  const navigate = useNavigate()

  // Redirect to login if no auth token exists
  if (!token) {
    return <Navigate to="/login" replace />
  }

  const handleSignOut = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userName')
    navigate('/login')
  }

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Dashboard</h1>
      <p>Hello {userName ? userName : 'User'}, you have successfully logged in!</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}

export default DashboardPage
