import React from 'react';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfilePage from './ProfilePage';
import Sidebar from './SidebarMenu';
import SignUpPage from './SignUpPage';
import Login from './Loginpage';
import './SignUpPage.css';
import { Routes, Route } from 'react-router-dom';
import Competition from './Competition';
import AceApply from './AceApply';
import './Competition.css';
import './AceApply.css';

function App() {
  return <Sidebar/>;
}

export default App;

        {/* <Route path="/" element={<Competition />} />
          <Route path="/ace-apply" element={<AceApply />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUpPage />} />*/}