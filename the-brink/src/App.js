// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AceApply from './AceApply';
import AdminSettings from './AdminSettings'
import AdminView from './AdminView';
import AppStatusF from './AppStatusF';
import Competition from './Competition';
import CompetitionDetails from './CompetitionDetails';
import DashboardPage from './DashboardPage';
import ForgotPassword from './ForgotPassword';
import Homepage from './Homepage';
import JudgesComps from './JudgesComps';
import JudgeScoreView from './JudgeScoreView';
import Login from './Loginpage';
import Messages from './Messages';
import OrganizerAnnouncements from './OrganizerAnnouncements';
import ProfilePage from './ProfilePage';
import RequireAdmin from './RequireAdmin';
import ResetPassword from './ResetPassword';
import ResourcesPage from './ResourcesPage';
import SignUpPage from './SignUpPage';
import UserAnnouncements from './UserAnnouncements';

function App() {
  return (
    <div>
      {/* Keep Routes Alphabetical by Path! */}
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/ace-apply' element={<AceApply />} />
        <Route path='/ace-details' element={<CompetitionDetails />} />
        <Route
          path='/admin-announcements'
          element={
            <RequireAdmin>
              <OrganizerAnnouncements />
            </RequireAdmin>
          }
        />
        <Route path='/admin-settings' element={<AdminSettings />} />
        <Route path='/admin-view' element={<AdminView />} />
        <Route path='/competitions' element={<Competition />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/founder-status' element={<AppStatusF />} />
        <Route path='/judges-comps' element={<JudgesComps />} />
        <Route path='/judges-scoring' element={<JudgeScoreView />} />
        <Route path='/login' element={<Login />} />
        <Route path='/messages' element={<Messages />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/resources' element={<ResourcesPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/user-announcements' element={<UserAnnouncements />} />
      </Routes>
    </div>
  );
}

export default App;

