import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Competition from './Competition'
import AceApply from './AceApply'
import Login from './Loginpage'
import SignUpPage from './SignUpPage'
import ProfilePage from './ProfilePage'
import AdminView from './AdminView'
import DashboardPage from './DashboardPage'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword' // ✅ Import ResetPassword component
import CompetitionDetails from './CompetitionDetails' // ✅ Added for the /ace-details route
import Messages from './Messages'

import './SignUpPage.css'
import './Competition.css'
import './AceApply.css'
import './AdminView.css'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Messages />} />
        <Route path='/ace-apply' element={<AceApply />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} /> {/* ✅ Reset password route */}
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/admin-view' element={<AdminView />} />
        <Route path='/competitions' element={<Competition />} />
        <Route path='/ace-details' element={<CompetitionDetails />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/messages' element={<Messages />} />
      </Routes>
    </div>
  )
}

export default App
