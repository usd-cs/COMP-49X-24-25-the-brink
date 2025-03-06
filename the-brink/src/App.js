import React from 'react'
import ProfilePage from './ProfilePage'
import SignUpPage from './SignUpPage'
import Login from './Loginpage'
import DashboardPage from './DashboardPage'
import Competition from './Competition'
import AceApply from './AceApply'
import ForgotPassword from './ForgotPassword'
import './SignUpPage.css'
import './Competition.css'
import './AceApply.css'
import { Routes, Route, Navigate } from 'react-router-dom'

// ProtectedRoute component that checks for an auth token
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken')
  return token ? children : <Navigate to="/login" replace />
}

function App () {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Competition />} />
        <Route path='/ace-apply' element={<AceApply />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route 
          path='/dashboard' 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/profile' 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  )
}

export default App
