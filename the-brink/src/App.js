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
import Messages from './Messages'
import './Messages.css'
import AdminView from './AdminView'
import './AdminView.css'

function App () {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Competition />} />
        <Route path='/ace-apply' element={<AceApply />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/messages' element={<Messages />} />
        <Route path='/admin-view' element={<AdminView />} />
      </Routes>
    </div>
  )
}

export default App
