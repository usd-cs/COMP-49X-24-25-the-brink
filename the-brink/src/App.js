import React from 'react'
import ProfilePage from './ProfilePage'
import SignUpPage from './SignUpPage'
import Login from './Loginpage'
import './SignUpPage.css'
import { Routes, Route } from 'react-router-dom'
import Competition from './Competition'
import AceApply from './AceApply'
import './Competition.css'
import './AceApply.css'
import AdminView from './AdminView'
import './AdminView.css'
import DashboardPage from './DashboardPage' // Import the dashboard component
import Messages from './Messages'

function App () {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Messages />} />
        <Route path='/ace-apply' element={<AceApply />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/admin-view' element={<AdminView />} />
        {/* New dashboard route */}
        <Route path='/dashboard' element={<DashboardPage />} />
      </Routes>
    </div>
  )
}

export default App
