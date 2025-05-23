import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Competition from './Competition';
import AceApply from './AceApply';
import Login from './Loginpage';
import SignUpPage from './SignUpPage';
import ProfilePage from './ProfilePage';
import AdminView from './AdminView';
import DashboardPage from './DashboardPage';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import CompetitionDetails from './CompetitionDetails';
import JudgesComps from './JudgesComps';
import Messages from './Messages';
import Homepage from './Homepage';
import AppStatusF from './AppStatusF'; 
import JudgeScoreView from './JudgeScoreView';
import AdminSettings from './AdminSettings'
import UserAnnouncements  from './UserAnnouncemnt'
import OrganizerAnnouncements from './OrganizerAnnouncements'

function App() {
  return (
    <div>
      {/* Keep Routes Alphabetical by Path! */}
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/ace-apply' element={<AceApply />} />
        <Route path='/ace-details' element={<CompetitionDetails />} />
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
        <Route path='/settings' element={<AdminSettings />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/user-announcements' element={<UserAnnouncements />} />
        <Route path='/admin-announcements' element={<OrganizerAnnouncements />} />
      </Routes>
    </div>
  );
}
export default App;
