import React from 'react';
import ProfilePage from './ProfilePage'; // Import ProfilePage component
import SignUpPage from './SignUpPage';
import Login from './Loginpage';
import './SignUpPage.css';
import { Routes, Route } from 'react-router-dom';
import Competition from './Competition';
import AceApply from './AceApply';
import './Competition.css';
import './AceApply.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Competition />} />
        <Route path="/ace-apply" element={<AceApply />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} /> {/* Added ProfilePage route */}
      </Routes>
   </div>
  );
}

export default App;
