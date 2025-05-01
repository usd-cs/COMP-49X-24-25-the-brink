// src/SidebarMenu.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SidebarMenu.css';

const SidebarMenu = () => {
  const navigate = useNavigate();

  // pull the full user object your login stored
  const stored = localStorage.getItem('user');
  const parsedUser = stored ? JSON.parse(stored) : {};

  // profile state
  const [profile, setProfile] = useState({
    firstName: parsedUser.firstName || '',
    lastName:  parsedUser.lastName  || '',
    email:     parsedUser.email     || '',
    company:   '',
    phone:     ''
  });

  // fetch extra fields (company/phone) once
  useEffect(() => {
    if (!profile.email) return;
    fetch(`/api/get-profile?email=${encodeURIComponent(profile.email)}`)
      .then(res => res.json())
      .then(data => {
        setProfile(p => ({
          ...p,
          company:   data.company || 'N/A',
          phone:     data.phone   || 'N/A',
          firstName: data.first_name,
          lastName:  data.last_name
        }));
      })
      .catch(err => console.error('Failed to fetch profile:', err));
  }, [profile.email]);

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/login');
  };

  const role = parsedUser.role;
  const announcementsLink =
    role === 'admin' ? '/admin-announcements' : '/user-announcements';

  // build initials for avatar
  const initials = (
    (profile.firstName[0] || '').toUpperCase() +
    (profile.lastName[0]  || '').toUpperCase()
  );

  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <div className='sidebar-profile-initials'>
          {initials || '??'}
        </div>
        <h3>{profile.firstName} {profile.lastName}</h3>
        <p>{profile.company}</p>
        <p>{profile.email}</p>
        <p>{profile.phone}</p>
      </div>

      <ul className='sidebar-menu'>
        <li><Link to="/founder-status">Applications</Link></li>
        <li><Link to="/resources">Resources</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/messages">Messages</Link></li>
        <li><Link to={announcementsLink}>Announcements</Link></li>
        <li><Link to="/competitions">Competitions</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
      </ul>

      <div className="sidebar-signout">
        <button onClick={handleSignOut} className="signout-button">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default SidebarMenu;

