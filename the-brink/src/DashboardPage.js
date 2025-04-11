import React from 'react'
import { useNavigate, Navigate } from 'react-router-dom'

const DashboardPage = () => {
  const token = localStorage.getItem('authToken')
  const userName = localStorage.getItem('userName')
  const userRole = localStorage.getItem('userRole')
  const navigate = useNavigate()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  const handleSignOut = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userName')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userEmail')
    navigate('/login')
  }

  const goToProfile = () => {
    navigate('/profile')
  }

  const goToAdminView = () => {
    navigate('/admin-view')
  }

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Dashboard</h1>
      <p>Hello {userName ? userName : 'User'}, you have successfully logged in!</p>
      <button onClick={goToProfile} style={{ marginRight: '1rem' }}>Go to Profile</button>
      {userRole === 'admin' && (
        <button onClick={goToAdminView} style={{ marginRight: '1rem' }}>Admin Panel</button>
      )}
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}

export default DashboardPage
